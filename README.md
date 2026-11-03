# kb-template-quartz

Digital garden and knowledge base built with [Quartz 5](https://quartz.jzhao.xyz/).

## Branch policy

This project uses Quartz v5 as the active working branch.

- Default branch: `v5`
- `main`: kept as a legacy/reference branch only
- Active development and sync commands should be run from `v5`

Example:

```bash
git checkout v5
npx quartz sync
git push origin v5
```

If you are deploying from GitHub Pages or another hosting platform, make sure the deployment target is set to the `v5` branch.

## Using this template

After creating a new repo from this template, update the values that are specific to the template itself:

| File                          | What to change                                                               |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `quartz.config.yaml`        | `baseUrl` (host and path only, no `https://`), `pageTitle`, `locale` |
| `quartz.config.yaml`        | Footer `links` (see [Customize the footer](#customize-the-footer))          |
| `quartz/styles/custom.scss` | The name in the footer credit line (`by ThaoNBT`)                          |
| `README.md`                 | Repo name, published site URL                                                |
| `content/`                  | Replace the sample notes with your own                                       |

`docs/` is the official Quartz documentation that ships with the template. It is only used by `npm run docs` and can be left untouched.

## Requirements

- Node.js 22 or newer
- npm 10.9.2 or newer

## Installation

```bash
npm install
npx quartz plugin install --from-config
```

## Build and run

There are two separate use cases depending on what content you want to build.

### 1. Build the official Quartz demo (content from `docs/`)

Use this if you want to preview or reproduce the site exactly as shown on the official Quartz demo (quartz.jzhao.xyz). This builds from the `docs/` folder, which ships with the template.

```bash
npm run docs
```

Open [http://localhost:8080/](http://localhost:8080/). The server watches for file changes and rebuilds automatically.

### 2. Build your own notes (content from `content/`)

Use this for day-to-day work on your own notes, written in the `content/` folder.

```bash
npx quartz build --serve
```

Open the local URL printed in the terminal (defaults to `http://localhost:8080/`). This is the command used for actual development on this repo.

### Running both at the same time

`docs/` and `content/` are independent source folders, but both dev servers default to the same output folder (`public/`) and the same WebSocket port (`3001`). Running two `--serve` instances without overriding these will make them silently overwrite each other's output. To preview both side by side, give each instance its own output folder, port, and WebSocket port:

```bash
# Terminal 1 — your own notes, output to ./public
npx quartz build --serve --output public

# Terminal 2 — the official demo, separate output folder and ports
npx quartz build --serve -d docs --output public-docs --port 8081 --wsPort 3002
```

Make sure both output folders (`public/` and `public-docs/`) are listed in `.gitignore`.

## Customize the footer

The footer is rendered by the `@quartz-community/footer` plugin. It outputs a `Created with Quartz vX © YEAR` line and a list of links. The plugin only accepts a `links` option, so the layout is adjusted with CSS.

### 1. Links (`quartz.config.yaml`)

The plugin only accepts a `links` option (a map of label to URL):

```yaml
- source: "@quartz-community/footer"
  enabled: true
  options:
    links:
      by ThaoNBT: https://github.com/thaonbt/kb-template-quartz
      About: https://<profile-site>/about
      Profile: https://<profile-site>/profile
      Portfolio: https://<profile-site>/portfolios
      Posts: https://<profile-site>/posts
  layout:
    position: footer
    priority: 50
```

- `by ThaoNBT` must stay the **first** entry. The CSS below places it on the same line as the `Created with Quartz` text.
- Replace `<profile-site>` with the real address of the profile site.

### 2. Layout (`quartz/styles/custom.scss`)

```scss
@use "./variables.scss" as *;

footer {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 1rem;
  row-gap: 0.15rem;

  & p {
    margin: 0;
  }

  // Make each <li> a direct flex item of the footer
  & ul {
    display: contents;
    margin: 0;
    padding: 0;
  }

  & li {
    list-style: none;
    margin: 0;
  }

  // Empty full-width element that forces a line break
  &::after {
    content: "";
    flex-basis: 100%;
    height: 0;
    order: 1;
  }

  & li:not(:first-child) {
    margin-right: 0.6rem;
  }

  // Layout A: credit line on top, links below
  & p,
  & li:first-child {
    order: 0;
  }
  & li:not(:first-child) {
    order: 2;
  }
}
```

Result:

```text
Created with Quartz v5.0.0 © 2026 by ThaoNBT
About Profile Portfolio Posts
```

To put the links on top and the credit line below instead, replace the last two rules (Layout A) with:

```scss
  // Layout B: links on top, credit line below
  & li:not(:first-child) {
    order: 0;
  }
  & p,
  & li:first-child {
    order: 2;
  }
```

If the layout looks wrong, inspect the footer in the browser DevTools and check that the markup is `<footer>` with a `<p>` and a `<ul><li>` list. Adjust the selectors if the plugin markup changes in a newer version.

## Run in Codespaces

Run either command above in the Codespace terminal, then open port `8080` from the **Ports** panel in VS Code. The public URL has this format:

```text
https://[codespace-id]-8080.app.github.dev/
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/main.yml` deploys automatically when changes are pushed to the `v5` branch.

```bash
git add .
git commit -m "Update notes"
git push origin v5
```

GitHub Actions will install dependencies, install Quartz plugins, build the site, and publish the `public/` directory.

In the repository settings, set **Pages → Source** to **GitHub Actions**. If it is set to **Deploy from a branch**, GitHub falls back to a Jekyll build and the site will not render correctly.

Published site:

[https://thaonbt.github.io/kb-template-quartz/](https://thaonbt.github.io/kb-template-quartz/)

> [!note]
> Other workflows in `.github/workflows/` (`deploy-v5.yaml`, `docker-build-push.yaml`, and similar) come from the upstream Quartz repository. They are guarded by a repository check and do not run on this repo.

## Useful commands

| Command                                     | Purpose                                                           |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `npx quartz plugin install --from-config` | Install all plugins referenced in `quartz.config.yaml`          |
| `npm run docs`                            | Build and serve the official Quartz demo (`docs/`) on port 8080 |
| `npx quartz build --serve`                | Build and serve your own notes (`content/`)                     |
| `npm run check`                           | Run TypeScript and formatting checks                              |
| `npm run format`                          | Format all files with Prettier                                    |
| `npm test`                                | Run the test suite                                                |

## Recommended VS Code Extensions

If you open this repo in VS Code or a Codespace, you'll be prompted to install these (see `.vscode/extensions.json`):

| Extension                 | Why                                                                   |
| ------------------------- | --------------------------------------------------------------------- |
| Markdown All in One       | TOC generation, checkbox/list shortcuts                               |
| markdownlint              | Catch markdown syntax errors before build                             |
| YAML                      | Frontmatter (properties) validation and autocomplete                  |
| Code Spell Checker        | Catch typos in notes                                                  |
| Paste Image               | Paste clipboard images directly into notes as files                   |
| Markdown Preview Enhanced | Preview Mermaid diagrams and KaTeX math; export notes to PDF/HTML/PNG |

## FAQ

**Does running `npm run docs` overwrite or delete my own notes?**

No. `docs/` and `content/` are separate source folders, so building from one never reads or writes the other. Both commands only write their output to `public/`, which is listed in `.gitignore` and is never committed. If you build the demo and later want your own site back, just run `npx quartz build --serve` again. It rebuilds `public/` from `content/` from scratch. Nothing needs to be manually reset or restored.

**Why is the footer layout done with CSS instead of config?**

The footer plugin renders its own markup and only exposes a `links` option, so the order of lines and the position of `by ThaoNBT` can only be changed with styles in `quartz/styles/custom.scss`.
