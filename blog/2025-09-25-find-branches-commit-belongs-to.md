---
slug: find-branches-commit-belongs-to
title: How to Find Branches a Commit Belongs To
authors: [nvh95]
tags: [git]
---

Need to find which branches contain a specific commit? Here's how.

<!-- truncate -->

## Local Branches

To find local branches containing a specific commit:

```bash
git branch --contains <commit-hash>
```

## Remote Branches

To find remote branches containing a specific commit:

```bash
git branch -r --contains <commit-hash>
```

## Both Local and Remote Branches

To find all branches (both local and remote) containing a specific commit:

```bash
git branch -a --contains <commit-hash>
```

## Bonus: Finding Tags

To find tags containing a specific commit:

```bash
git tag --contains <commit-hash>
```
