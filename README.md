# Handbook

A personal handbook containing useful tips, tricks, and solutions to common problems encountered in software development. This website is built using [Docusaurus](https://docusaurus.io/).

## Getting Started

### Installation

```bash
pnpm install
```

### Local Development

```bash
pnpm start
```

This command starts a local development server at port 3010. Most changes are reflected live without having to restart the server.

### Build

```bash
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Serve the Built Website

```bash
pnpm serve
```

## Deployment

Using SSH:

```bash
USE_SSH=true pnpm deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Content Structure

- `/blog`: Contains blog posts with tips and solutions
- `/docs`: Contains documentation pages
- `/src`: Source code for the website
