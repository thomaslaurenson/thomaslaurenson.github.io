// Renders the project card images that are drawn in code. Each template,
// images/projects/<name>.html, becomes <name>-light.png and <name>-dark.png
// beside it, coloured with the Material 3 roles in src/theme/colorRoles.js,
// so the images follow the site theme.
//
// Templates read the roles as CSS variables on :root, named after the role
// (primaryContainer is --primary-container), and set data-ready on <body>
// once they have finished laying out. The PNGs are committed and
// convert-images builds the web formats from them, so only this script needs
// Chrome. Set CHROME_PATH if Chrome or Chromium is not found.
//
// A template can change how it is rendered with <meta> tags:
//
//   <meta name="thumbnail-split" content="420,0 700,0 700,300 252,300">
//     For a project with light and dark modes of its own: both renders in
//     one image, <name>.png, the dark one inside these SVG polygon points.
//   <meta name="thumbnail-themed" content="false">
//     For a page with one look: rendered once, to <name>.png.
//   <meta name="thumbnail-viewport" content="1080x463">
//     Lays the page out at this size and keeps the top of it, scaled to
//     700px wide: for a page that needs a wider screen for its full layout,
//     or has empty space below what is worth showing.
//   <meta name="thumbnail-url" content="https://example.com/">
//   <meta name="thumbnail-ready" content="document.title !== ''">
//     Renders that live page instead of the template. A live page cannot set
//     data-ready, so it is taken as ready once its network is idle and the
//     thumbnail-ready expression, run in the page, is true.
//
// The cards of split and unthemed templates are not themed. Templates are
// one file each, with anything they need inlined; images/projects/shared
// holds the styles and scripts several of them use.
//
// Usage: npm run thumbnails [-- name ...]
import { access, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import colorRoles from '../src/theme/colorRoles.js';

const root = path.resolve(import.meta.dirname, '..');
const projectDir = path.join(root, 'images', 'projects');
const viewport = { width: 700, height: 300, deviceScaleFactor: 1 };
const modes = ['light', 'dark'];

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const findChrome = async () => {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Not installed here, try the next one
    }
  }
  throw new Error('Chrome not found; set CHROME_PATH');
};

const toCssVariables = (roles) => {
  const declarations = Object.entries(roles).map(
    ([role, value]) => `--${role.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${value};`,
  );
  return `:root { ${declarations.join(' ')} }`;
};

// Lays the dark render over the light one, cut to the polygon
const joinSplit = async (renders, points) => {
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${viewport.width}" height="${viewport.height}">`
    + `<polygon points="${points}"/></svg>`,
  );
  const darkPart = await sharp(renders.dark)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  return sharp(renders.light)
    .composite([{ input: darkPart }])
    .png()
    .toBuffer();
};

const available = (await readdir(projectDir))
  .filter((f) => path.extname(f) === '.html')
  .map((f) => path.parse(f).name)
  .sort();
const requested = process.argv.slice(2);
const unknown = requested.filter((name) => !available.includes(name));
if (unknown.length > 0) {
  throw new Error(`No template for ${unknown.join(', ')}; have ${available.join(', ')}`);
}
const names = requested.length > 0 ? requested : available;

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  // Lets the templates load the fonts from node_modules
  args: ['--allow-file-access-from-files'],
});
try {
  const page = await browser.newPage();
  for (const name of names) {
    const template = pathToFileURL(path.join(projectDir, `${name}.html`)).href;

    // The page has to be sized before it loads, so the settings are read
    // with a load of their own.
    await page.setViewport(viewport);
    await page.goto(template);
    const settings = await page.evaluate(() => {
      const meta = (key) => document.querySelector(`meta[name="${key}"]`)?.content ?? null;
      return {
        split: meta('thumbnail-split'),
        themed: meta('thumbnail-themed') !== 'false',
        size: meta('thumbnail-viewport'),
        url: meta('thumbnail-url'),
        ready: meta('thumbnail-ready'),
      };
    });
    const [width, height] = settings.size
      ? settings.size.split('x').map(Number)
      : [viewport.width, viewport.height];
    const scale = viewport.width / width;
    const frame = { x: 0, y: 0, width, height: viewport.height / scale };
    if (!(height >= frame.height)) {
      throw new Error(`${name}: thumbnail-viewport must be at least ${Math.ceil(frame.height)}px high`);
    }
    await page.setViewport({ width, height, deviceScaleFactor: scale });

    const renders = {};
    for (const mode of settings.themed || settings.split ? modes : ['light']) {
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: mode }]);
      if (settings.url) {
        await page.goto(settings.url, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.waitForFunction(settings.ready ?? 'true', { timeout: 30000 });
        // Two frames, so whatever made the page ready has been drawn
        await page.evaluate(() => new Promise((done) => {
          requestAnimationFrame(() => requestAnimationFrame(done));
        }));
      } else {
        await page.goto(template);
        await page.addStyleTag({ content: toCssVariables(colorRoles[mode]) });
        await page.waitForSelector('body[data-ready]', { timeout: 10000 });
      }

      const failedFonts = await page.evaluate(() =>
        [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family),
      );
      if (failedFonts.length > 0) {
        throw new Error(`${name}: fonts failed to load: ${failedFonts.join(', ')}`);
      }

      renders[mode] = await page.screenshot({ clip: frame });
    }

    let images;
    if (settings.split) {
      images = { [name]: await joinSplit(renders, settings.split) };
    } else if (!settings.themed) {
      images = { [name]: renders.light };
    } else {
      images = Object.fromEntries(modes.map((mode) => [`${name}-${mode}`, renders[mode]]));
    }
    for (const [file, image] of Object.entries(images)) {
      const output = path.join(projectDir, `${file}.png`);
      await writeFile(output, image);
      console.log(`thumbnails: ${path.relative(root, output)}`);
    }
  }
} finally {
  await browser.close();
}
