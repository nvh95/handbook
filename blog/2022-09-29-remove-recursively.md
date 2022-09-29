---
slug: remove-files-folders-recursively
title: Remove file or folder recursively
authors: [nvh95]
tags: []
---

How to remove files and folders with a name pattern recursively?

<!-- truncate -->

## Remove files recursively

- Dry run

```bash
find . -name "\*.bak" -type f
```

- Remove

```bash
find . -name "\*.bak" -type f -delete
```

https://askubuntu.com/questions/377438/how-can-i-recursively-delete-all-files-of-a-specific-extension-in-the-current-di

## Remove folders recursively

- Dry run

```bash
find . -name 'node_modules' -type d -prune
```

If you want to remove all `dist` folders, but not in `node_modules`:

```bash
find . -name 'dist' -not -path "./node_modules/\*" -type d -prune
```

- Remove

```bash
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

## Reference

https://stackoverflow.com/questions/42950501/delete-node-modules-folder-recursively-from-a-specified-path-using-command-line
