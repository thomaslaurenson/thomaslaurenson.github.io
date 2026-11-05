// Builds the site's images in public from the originals in images. Each
// original becomes an AVIF, a WebP and a JPG fallback at the same path, so
// images/employers/aut.png becomes public/employers/aut.avif, .webp and .jpg.
// Files that are not images, such as the project templates, are skipped.
// Save new screenshots as PNG: JPG blurs text, and every format below is
// encoded from the original, so a lossless original gives the best results.
//
// Runs automatically before `npm run dev` and `npm run build`. An output is
// only rebuilt when it is missing or older than its original; pass --force
// to rebuild everything. The outputs are generated and ignored by git.
//
// Usage: npm run images [-- --force]
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourceDir = path.join(root, 'images');
const outputDir = path.join(root, 'public');
const force = process.argv.includes('--force');

const isJpeg = (file) => ['.jpg', '.jpeg'].includes(path.extname(file).toLowerCase());
const isPng = (file) => path.extname(file).toLowerCase() === '.png';

// Output extension -> how to make it from an original
const outputs = {
  avif: (source, output) => sharp(source).avif({ quality: 60 }).toFile(output),
  webp: (source, output) => sharp(source).webp({ quality: 80 }).toFile(output),
  // A JPG original already is the fallback; copying avoids a lossy re-encode.
  // JPG has no alpha channel, so a transparent original is flattened onto
  // white rather than left to whatever colour its transparent pixels hold.
  jpg: (source, output) => isJpeg(source)
    ? copyFile(source, output)
    : sharp(source).flatten({ background: '#ffffff' }).jpeg({ quality: 85, mozjpeg: true }).toFile(output),
};

const isOutdated = async (source, output) => {
  try {
    return (await stat(source)).mtimeMs > (await stat(output)).mtimeMs;
  } catch {
    return true; // Output does not exist yet
  }
};

const originals = (await readdir(sourceDir, { recursive: true }))
  .filter((f) => isJpeg(f) || isPng(f))
  .sort();
const seen = new Map();
for (const file of originals) {
  const name = path.join(path.dirname(file), path.parse(file).name);
  if (seen.has(name)) {
    throw new Error(`images has both ${seen.get(name)} and ${file}; keep one`);
  }
  seen.set(name, file);
}

let built = 0;
for (const [name, file] of seen) {
  const source = path.join(sourceDir, file);
  await mkdir(path.join(outputDir, path.dirname(file)), { recursive: true });
  for (const [ext, make] of Object.entries(outputs)) {
    const output = path.join(outputDir, `${name}.${ext}`);
    if (!force && !(await isOutdated(source, output))) continue;
    await make(source, output);
    built++;
  }
}

console.log(`images: ${built} file(s) built from ${seen.size} original(s) in images`);
