---
slug: customize-html-vitest
title: Customize HTML in Vitest
authors: [nvh95]
tags: [vitest, testing]
---

In some scenarios, you may want to customize the HTML in Vitest to align with your actual app's HTML structure. You can do it by one of the following options:

<!-- truncate -->

1. Update the initial HTML by `environmentOptions`

Update to `vitest.config.js` or `vitest.config.ts`:

```js
export default {
  test: {
    environment: 'jsdom', // or 'happy-dom'
    environmentOptions: {
      jsdom: {
        html: '<!DOCTYPE html><div id="root"></div></html>',
      },
    },
  },
};
```

Use [`container`](https://testing-library.com/docs/react-testing-library/api#container-1) option to specify container of your test:

```js
root.id = "root";
render(<App />, {
  container: document.getElementById("root"),
});
```

2. Update HTML at runtime

Use [`container`](https://testing-library.com/docs/react-testing-library/api#container-1) of `@testing-library/react`'s `render` function (Please refer to https://testing-library.com/ if you are using `@testing-library/other-framework`):

```js
// App.test.tsx
import { render } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

const root = document.createElement("div");
root.id = "root";

test("should work correctly", () => {
  render(<App />, {
    // Add container here 👇
    container: document.body.appendChild(root),
  });
});
```

You can assert your HTML by `console.log(document.body.outerHTML)`:

```html
<body>
  <div id="root">
    <!-- Your app's HTML -->
  </div>
</body>
```

3. Specify environment for specific test files

You can also set the environment and its options for specific test files using the `@vitest-environment` comment at the top of your test file:

```js
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test("should work correctly", () => {
  const root = document.createElement("div");
  root.id = "root";
  render(<App />, {
    container: document.body.appendChild(root),
  });
});
```

Also, you can use [Vitest Preview](https://www.vitest-preview.com/) to preview a test directly in a browser.

<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/8603085/197373376-f6a3fe33-487b-4c35-8085-8e7e6357ce40.gif" alt="Vitest Preview Demo" />
</p>

Learn more at [www.vitest-preview.com](https://www.vitest-preview.com)
