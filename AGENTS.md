# Repository Guidelines

## Project Structure & Module Organization
Astro source files live under `src/`, with entry routes in `src/pages/` (each `.astro` or `.md` file becomes a path). Page layouts and shared UI belong in `src/layouts/` and `src/components/`, while long‑lived media sits in `src/assets/` and design tokens/styles in `src/styles/`. Content collections are defined in `src/content/` and typed via `content.config.ts`; add new blog posts inside `src/content/blog/` so they inherit the schema. Static files that must ship verbatim (favicons, robots.txt, Open Graph images) go in `public/`. Global configuration is centralized in `astro.config.mjs` and TypeScript settings in `tsconfig.json`.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (Sharp needs native binaries, so prefer pnpm).
- `pnpm dev` — launch the Astro dev server on `localhost:4321` with hot reload.
- `pnpm build` — produce the production build in `dist/`.
- `pnpm preview` — run the built site locally to smoke-test deploy artifacts.
- `pnpm astro check` — run Astro’s type and accessibility checks (use for CI-style validation).

## Coding Style & Naming Conventions
Follow the default Astro + TypeScript style: tabs for indentation, single quotes in scripts, and double quotes only within HTML attributes. Components and layouts should stay in PascalCase (`BaseLayout.astro`), while routes and content folders use kebab-case (`src/pages/blog/index.astro`). Prefer small, typed utilities and keep imports ordered from external to local modules. Run `pnpm astro format` if you install the optional formatter, otherwise rely on your editor’s Astro extension and Prettier defaults.

## Testing Guidelines
Automated tests are not yet defined, so rely on `pnpm astro check` plus visual verification: run `pnpm dev` for iterative checks and `pnpm preview` before a PR to ensure RSS, sitemap, and MDX compilation succeed. When adding utilities, co-locate lightweight assertions in MDX examples or create future `*.test.ts` files under `src/` so they can plug into Vitest if/when it is introduced. Document any manual test cases in the PR description.

## Commit & Pull Request Guidelines
Keep commits short and imperative (e.g., `add rss helpers`, mirroring `git log`). Reference issues in the body when relevant. Each PR should include: a concise summary of the change, screenshots for visual tweaks (desktop + mobile), a list of commands run (`pnpm dev`, `pnpm build`, checks, etc.), and notes about content schema updates. Request review before merging and wait for CI (if configured) to pass.
