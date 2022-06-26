---
slug: convert-to-mp3
title: Convert to mp3 using ffmpeg
authors: [nvh95]
tags: [mp3, ffmpeg]
---

You can convert audio/ video files to mp3 format using ffmpeg by:

```
ffmpeg -i input.mov -c:v copy -c:a libmp3lame -q:a 4 output.mp3
```

This is handy when you trim the video/ audio when using QuickTime on macOS (since the extension will be `.mov` or `.m4a`)
