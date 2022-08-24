---
slug: cannot-run-gpg
title: Cannot run gpg No such file or directory
authors: [nvh95]
tags: [git, gpg]
---

> git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file -
error: cannot run gpg: No such file or directory
error: gpg failed to sign the data
fatal: failed to write commit object

Answer: 
```bash
git config --global gpg.program "$(which gpg)"

```

Reference: https://stackoverflow.com/questions/36941533/git-hub-desktop-on-mac-error-cannot-run-gpg-no-such-file-or-directory
