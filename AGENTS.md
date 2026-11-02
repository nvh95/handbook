# AGENTS.md

## Project overview

This repository is a personal handbook and technical blog built with Docusaurus 2.4.3, React 17, TypeScript, and pnpm. Prefer small, focused changes that preserve the existing site structure and writing style.

## Repository map

- `blog/`: dated Markdown blog posts and `authors.yml`
- `docs/`: Docusaurus documentation pages
- `src/pages/`: standalone pages
- `src/components/`: reusable React components
- `src/theme/`: swizzled Docusaurus theme overrides; keep changes compatible with Docusaurus 2.4.3
- `src/css/custom.css`: global theme and site styling
- `static/`: files served from the site root
- `docusaurus.config.js`: site, navigation, integrations, and deployment configuration
- `sidebars.js`: documentation sidebar configuration

## Working conventions

- Use `pnpm`; do not introduce npm or Yarn lockfiles.
- Preserve the versions and React 17 compatibility constraints in `package.json` unless an upgrade is explicitly requested.
- Match the existing code style: two-space indentation, double quotes in JavaScript/TypeScript, semicolons, and function components.
- Reuse Docusaurus aliases such as `@site`, `@theme`, and `@docusaurus` where the surrounding code does.
- Treat files under `src/theme/` as maintained overrides. Compare behavior with the installed Docusaurus version before changing their structure.
- Keep unrelated user changes intact. Check `git status --short` before and after editing, and do not rewrite or discard files outside the task.
- Never run deployment commands unless the user explicitly asks for deployment.

## Content conventions

- Blog filenames use `YYYY-MM-DD-kebab-case.md`.
- Blog posts begin with YAML frontmatter containing `slug`, `title`, `authors: [nvh95]`, and relevant `tags`.
- Add `<!-- truncate -->` after the introductory section so blog index previews remain concise.
- Use descriptive headings, fenced code blocks with a language identifier, and relative paths for repository-owned assets.
- Put blog-specific images in `blog/` near the post unless the existing content pattern for that feature calls for `static/`.
- Verify commands and technical claims when practical. Do not fabricate output, package behavior, or links.

## Common commands

```bash
pnpm install
pnpm start       # local server on http://localhost:3010
pnpm typecheck
pnpm build
pnpm serve       # serve the generated build
```

There is currently no dedicated lint or test script. Do not claim those checks passed unless such tooling has been added and run.

## Validation

Run the narrowest checks relevant to the change:

- Markdown/content-only changes: run `pnpm build`. The build fails on broken links and warns on broken Markdown links; review warnings related to edited content.
- TypeScript or React changes: run both `pnpm typecheck` and `pnpm build`.
- Styling or layout changes: run the checks above, then inspect the affected page at desktop and mobile widths when browser access is available.
- Dependency changes: update `pnpm-lock.yaml`, then run `pnpm typecheck` and `pnpm build`.

If a check cannot run because dependencies or external services are unavailable, report that plainly instead of treating it as a successful validation.
