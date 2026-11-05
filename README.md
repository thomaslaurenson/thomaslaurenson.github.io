# thomaslaurenson.github.io

Source for [www.thomaslaurenson.com](https://www.thomaslaurenson.com): a single page React app using MUI, built with Vite. Every push to `main` builds the site and deploys it to GitHub Pages.

## Development

```sh
make install   # install dependencies
make run       # start the dev server
make build     # build the site into dist/
make lint      # lint src/, scripts/ and images/
```

## Images

Every image on the site is built from an original in `images/`; the web versions in `public/` are generated and ignored by git. `make images` builds an AVIF, a WebP and a JPG fallback for each original at the same path under `public/`, so `images/employers/aut.png` becomes `public/employers/aut.avif`, `.webp` and `.jpg`. It runs automatically before `make run` and `make build`, and only rebuilds what has changed.

Save an original that has text in it as PNG, as JPG blurs text.

### Project thumbnails

The project card images are drawn in code. Each `images/projects/<name>.html` is a template that `make thumbnails` renders to a PNG beside it. The PNGs are committed, so only rendering needs Chrome or Chromium; set `CHROME_PATH` if it is not found. To render one template, run `npm run thumbnails -- <name>`.

By default a template becomes `<name>-light.png` and `<name>-dark.png`, coloured with the site's Material 3 colour roles from `src/theme/colorRoles.js`, which templates read as CSS variables such as `--primary-container`. `images/projects/shared/` holds the base styles and the terminal session helper several templates use.

A template can change how it is rendered with `<meta>` tags:

| Meta tag | Effect |
|---|---|
| `thumbnail-split` | Joins the page's own light and dark renders into one `<name>.png`, the dark part inside the given SVG polygon |
| `thumbnail-themed` | `false` renders a page with one look once, to `<name>.png` |
| `thumbnail-viewport` | Lays the page out at a `WxH` size and keeps the top of it, scaled to 700px wide |
| `thumbnail-url` | Renders a live page instead of the template; `thumbnail-ready` says when it has loaded |

`cellmate.html` renders the live game, so updating that image needs the network; every other template renders offline.

### Adding a project

1. Write `images/projects/<name>.html`, starting from a similar template.
2. Run `npm run thumbnails -- <name>` and check the PNGs.
3. Add the project to `src/data/constants.js` with `img: '<name>'`, and `themed: true` unless the template makes a single `<name>.png`.
