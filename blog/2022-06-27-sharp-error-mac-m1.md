---
slug: sharp-error-mac-m1
title: Sharp error mac m1
authors: [nvh95]
tags: [gatsby, mac m1, sharp]
---

When running command `yarn` to install dependencies for a Gatsby project on Mac M1, I encounter this error:

```
error /Users/myname/myrepo/node_modules/sharp: Command failed.
Exit code: 1
Command: (node install/libvips && node install/dll-copy && prebuild-install --runtime=napi) || (node-gyp rebuild && node install/dll-copy)
Arguments:
Directory: /Users/myname/myrepo/node_modules/sharp
Output:
info sharp Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.9.1/libvips-8.9.1-darwin-arm64v8.tar.gz
ERR! sharp Prebuilt libvips 8.9.1 binaries are not yet available for darwin-arm64v8
info sharp Attempting to build from source via node-gyp but this may fail due to the above error
info sharp Please see https://sharp.pixelplumbing.com/install for required dependencies
gyp info it worked if it ends with ok
```

The reason is `sharp` does not work work well with Mac M1 (yet), the solution is you should reinstall `vips` package on your Mac as follow:

1. xcode-select --install
1. brew install gcc
1. brew reinstall vips
1. brew info vips
1. npm i

Please see https://stackoverflow.com/a/67566332/3422559 for more.

If this does not resolve your problem, try with Node 14.

If this still does not resolve your problem, follow this (https://github.com/lovell/sharp/issues/2588#issuecomment-783254806)

```
brew remove vips
rm -rf node_modules
yarn install
```
