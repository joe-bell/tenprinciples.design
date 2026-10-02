# tenprinciples.design

A single-page static site presenting Dieter Rams' "Ten Principles for Good Design".
Public repo, public site, open to outside contributions.

## Stack

- **Astro 5**, `output: "static"`, deployed to **Cloudflare Workers** via
  `@astrojs/cloudflare` (`wrangler.jsonc`).
- **Tailwind 4** built as a **separate step** — `build:css` runs the Tailwind CLI into
  `src/styles/output.css` (gitignored), which `src/layouts/root.astro` inlines with `?raw`.
- **pnpm** (see `packageManager`), **Node 22** (`.nvmrc`, and `engine-strict=true` in
  `.npmrc` means other majors are refused).

## Layout

- `src/principles/*.md` — the ten principles, one file each, `NN-` prefixed. The prefix is
  load-bearing: `src/pages/index.astro` parses it to sort and throws if it can't.
- `src/pages/` — `index.astro`, `404.astro`, `manifest.webmanifest.ts`, and `api/event.ts`
  (the only non-prerendered route, a proxy for Plausible).
- `src/config.ts` — site title, description, and attribution.

## Commands

```sh
pnpm install
pnpm dev
pnpm build    # build:css + astro check + astro build
pnpm preview
```

## Merging and repo hygiene

- **Only the maintainer merges.** The `main` ruleset restricts updates to him
  (see [`.github/rulesets/README.md`](./.github/rulesets/README.md)). Agents
  open pull requests and get them green; they never merge or enable
  auto-merge.
- **This repo is public, so everything written here is published.** Files,
  commits, branch names, pull request titles and descriptions, and comments
  must not mention the maintainer's private repositories, internal tooling,
  automation, or plans. Describe the change itself and nothing about where it
  came from.

## Reviewing

CI is `prettier --check` only — no tests, no type-check, no build. Read
[REVIEW.md](./REVIEW.md) before reviewing a pull request.
