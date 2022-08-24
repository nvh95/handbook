---
slug: gatsby-pnpm
title: Use pnpm with Gatsby
authors: [nvh95]
tags: [gatsby, pnpm]
---

I recently migrated my Gatsby project from yarn to pnpm. So in this post I will go over quickly what needs to be done to get it working.

You can see the full PR that I migrate my project to pnpm here: <https://github.com/nvh95/hung.dev/pull/62>

<!--truncate-->

## Replace yarn/npm by pnpm

1. Remove node_modules
2. You can run [`pnpm import`](https://pnpm.io/cli/import) to generate pnpm lock file from `yarn.lock`, `package-lock.json` or `npm-shrinkwrap.json`. You can always use `pnpm install` to do a fresh installation.

<!-- TODO: To add error message -->

You might want to add those to `.npmrc`.

```
auto-install-peers=true
strict-peer-dependencies=false
```

<!-- TODO: To add error message -->

You might need to add some missing packages to package.json since `pnpm` does not use flat architecture like `npm`. It might be confused at first. But it actually is a good thing.

## Install gatsby-plugin-pnpm

Since webpack does not understand how to resolve packages under `node_modules` with `pnpm`'s architecture yet, you need to install `gatsby-plugin-pnpm` then configure it

```
pnpm add -D gatsby-plugin-pnpm
```

```javascript
// gatsby-config.ts
export default {
  plugins: ["gatsby-plugin-pnpm"],
};
```

## Configure Netlify

Netlify hasn't had first-class support for `pnpm` yet (August 2022). So we need to do 2 things

1. Setup pnpm
2. Prevent Netlify from `npm install`

```
[build]
  command = "npx pnpm install --store=node_modules/.pnpm-store"
[build.environment]
  NPM_FLAGS = "--version" # prevent Netlify npm install
```

Remember to **Deploy without Cache** if your build fails.
