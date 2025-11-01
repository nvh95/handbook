---
slug: add-giscus-comments-docusaurus
title: Add Giscus Comments to Docusaurus
authors: [nvh95]
tags: [docusaurus, giscus, comments]
---

Adding a comment section to your Docusaurus blog can increase engagement with your readers. [Giscus](https://giscus.app/) is an excellent choice as it uses GitHub Discussions as a backend, allowing readers to comment using their GitHub accounts without requiring additional authentication systems.

<!-- truncate -->

## Why Giscus?

- **GitHub-powered**: Uses GitHub Discussions, so no separate database needed
- **Privacy-friendly**: No tracking like Disqus or other third-party services
- **Theme support**: Automatically adapts to your site's light/dark mode
- **Free and open source**: No costs or vendor lock-in
- **Easy moderation**: Manage comments directly in your GitHub repository

## Prerequisites

Before starting, ensure you have:

1. A public GitHub repository for your Docusaurus site
2. GitHub Discussions enabled in your repository settings
3. The [Giscus app](https://github.com/apps/giscus) installed on your repository

## Installation Steps

### 1. Install the Giscus React package

```bash
pnpm add @giscus/react
```

**Important**: If you're using Docusaurus 2.x with React 17, install version 2.4.0:

```bash
pnpm add @giscus/react@2.4.0
```

### 2. Install theme-common dependency

For Docusaurus 2.x, you may need to explicitly install `@docusaurus/theme-common`:

```bash
pnpm add @docusaurus/theme-common@2.4.3
```

Replace `2.4.3` with your Docusaurus version.

### 3. Configure Giscus

Visit [giscus.app](https://giscus.app/) and follow the configuration wizard:

1. Enter your repository name (e.g., `username/repo`)
2. Choose page ↔️ discussions mapping (recommended: `pathname`)
3. Select a discussion category (e.g., `Announcements`)
4. Choose features (reactions, comment box position, etc.)

The wizard will generate configuration values you'll need in the next step.

### 4. Create the Giscus Component

Create a new file at `src/components/GiscusComponent/index.tsx`:

```tsx
import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="your-username/your-repo"
      repoId="YOUR_REPO_ID"
      category="Announcements"
      categoryId="YOUR_CATEGORY_ID"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
}
```

Replace the values with those from the Giscus configuration wizard.

**Key feature**: The `theme={colorMode}` automatically syncs with Docusaurus's theme, providing seamless light/dark mode switching.

### 5. Swizzle the BlogPostPage Component

Swizzle the `BlogPostPage` component to add the comments section:

```bash
pnpm run swizzle @docusaurus/theme-classic BlogPostPage --eject --danger
```

When prompted, choose "Eject" to have full control over the component.

### 6. Integrate Giscus into BlogPostPage

Open `src/theme/BlogPostPage/index.tsx` and make these changes:

1. Import the GiscusComponent at the top:

```tsx
import GiscusComponent from '@site/src/components/GiscusComponent';
```

2. Add the component after `<BlogPostItem>`:

```tsx
<BlogPostItem>{children}</BlogPostItem>
<GiscusComponent />
{(nextItem || prevItem) && (
  <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
)}
```

### 7. Start the Development Server

```bash
pnpm start
```

Visit any blog post, and you should see the Giscus comment section at the bottom!

## Troubleshooting

### Module not found errors

If you see errors like `Can't resolve '@docusaurus/theme-common'`, ensure you've installed the correct version:

```bash
pnpm add @docusaurus/theme-common@2.4.3
```

### React version mismatch

If you're using Docusaurus 2.x with React 17, make sure to use `@giscus/react@2.4.0` instead of the latest version which requires React 18+.

### Comments not loading

1. Verify your repository is public
2. Check that GitHub Discussions is enabled
3. Ensure the Giscus app is installed on your repository
4. Verify the `repo`, `repoId`, `category`, and `categoryId` values are correct

## Customization

You can customize the Giscus appearance and behavior by modifying the props in `GiscusComponent`:

- `mapping`: How to map pages to discussions (`pathname`, `url`, `title`, etc.)
- `inputPosition`: Position of comment box (`top` or `bottom`)
- `reactionsEnabled`: Enable/disable reactions
- `loading`: Set to `lazy` for better performance

## Conclusion

Giscus provides a lightweight, privacy-friendly commenting system that integrates seamlessly with Docusaurus. By leveraging GitHub Discussions, you get a robust comment system without managing additional infrastructure.

The automatic theme switching and GitHub authentication make it an excellent choice for technical blogs and documentation sites.
