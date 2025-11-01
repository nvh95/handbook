---
slug: handy-git-commands
title: Handy Git Commands Every Developer Should Know
authors: [nvh95]
tags: [git, development]
---

Git is an essential tool for modern software development. While most developers are familiar with basic commands like `git add`, `git commit`, and `git push`, there are many lesser-known but incredibly useful Git commands that can make your workflow more efficient. This post covers some handy Git commands that might not be part of your daily routine but can be extremely valuable in specific situations:

- Finding Branches Containing a Specific Commit
- Finding the Merge Base Between Two Branches
- Finding Changes Between Commits
- Stashing Untracked Files
- Searching Through Commit History
- Checking Out Pull Requests Locally
- Recovering Lost Commits

<!-- truncate -->

## Finding Branches Containing a Specific Commit

Have you ever needed to know which branches contain a particular commit? This is especially useful when tracking where a bug fix or feature has been merged.

```bash
git branch --contains <commit-hash>
```

This command lists all local branches that include the specified commit. To include remote branches in the search:

```bash
git branch -r --contains <commit-hash>
```

For both local and remote branches:

```bash
git branch -a --contains <commit-hash>
```

**Example:**

```bash
git branch --contains 8a7d3f1
# Output might show:
# * main
#   feature/authentication
```

## Finding the Merge Base Between Two Branches

The merge base is the common ancestor commit from which two branches diverged. This is useful for understanding the relationship between branches or determining which commits would be included in a merge.

```bash
git merge-base <branch1> <branch2>
```

**Example:**

```bash
git merge-base main feature/payment
# Output: 7d3f8a21e6c8d9b4a0f2e1d3c5b7a9f8e0d2c4b6
```

You can then use this commit hash to see what changes have been made since the branches diverged:

```bash
git log --oneline <merge-base-hash>..feature/payment
```

## Finding Changes Between Commits

To see what changes were introduced in a specific commit:

```bash
git show <commit-hash>
```

To compare two commits:

```bash
git diff <commit-hash1>..<commit-hash2>
```

**Example:**

```bash
git diff HEAD~3..HEAD
# Shows changes between the current commit and three commits ago
```

## Stashing Untracked Files

The standard `git stash` only saves tracked files. To include untracked files in your stash:

```bash
git stash -u
# or
git stash --include-untracked
```

To stash only specific files:

```bash
git stash push -m "stash message" path/to/file1 path/to/file2
```

## Searching Through Commit History

To search for commits that match a specific pattern in their messages:

```bash
git log --grep="search term"
```

To search for commits that add or remove specific code:

```bash
git log -S"function_name"
```

**Example:**

```bash
git log -S"authenticateUser"
# Finds commits that add or remove the authenticateUser function
```

## Temporarily Ignoring Files

Sometimes you need to make local changes to a file but don't want to commit those changes. You can temporarily tell Git to ignore changes to a specific file:

```bash
git update-index --assume-unchanged path/to/file
```

To start tracking changes again:

```bash
git update-index --no-assume-unchanged path/to/file
```

## Finding Who Changed a Line

To see who last modified each line of a file and in which commit:

```bash
git blame path/to/file
```

To limit the blame to specific lines:

```bash
git blame -L 10,20 path/to/file
# Shows blame for lines 10 through 20
```

## Cleaning Up Local Branches

To remove local branches that have been merged into the main branch:

```bash
git branch --merged main | grep -v "^\*\|main" | xargs git branch -d
```

This command finds all branches merged into main, excludes the current branch and main itself, and deletes them.

## Visualizing Branch History

For a graphical representation of your branch history:

```bash
git log --graph --oneline --all --decorate
```

For a more compact view:

```bash
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## Checking Out Pull Requests Locally

To check out a pull request from GitHub or similar platforms:

```bash
git fetch origin pull/<PR-number>/head:pr-<PR-number>
git checkout pr-<PR-number>
```

**Example:**

```bash
git fetch origin pull/123/head:pr-123
git checkout pr-123
```

## Recovering Lost Commits

If you've lost commits due to a reset or other operations, you can find them using the reflog:

```bash
git reflog
```

Once you find the lost commit, you can recover it:

```bash
git checkout -b recovery-branch <commit-hash>
```
