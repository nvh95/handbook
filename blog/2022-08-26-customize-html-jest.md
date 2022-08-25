---
slug: customize-html-jest
title: Customize HTML in Jest
authors: [nvh95]
tags: [jest, testing]
---

In some scenarios, you may want to customize the HTML in Jest to align with your actual app's HTML structure. You can do it by one of the following options:

<!-- truncate -->

1. Update the initial HTML by `testEnvironmentOptions`

Update to `jest.config.js`

```js
testEnvironmentOptions: {
	html: '<!DOCTYPE html><div id="root"></div></html>',
},
```

Use [`container`](https://testing-library.com/docs/react-testing-library/api#container-1) option to specify container of your test

```js
root.id = "root";
render(<App />, {
  container: document.getElementById("root"),
});
```

2. Update HTML at runtime

Use [`container`](https://testing-library.com/docs/react-testing-library/api#container-1) of `@testing-library/react`'s `render` function (Please refer to https://testing-library.com/ if you are using `@testing-library/other-framework`)

```js
// App.test.tsx
const root = document.createElement("div");
root.id = "root";

test("should work correctly", () => {
  render(<App />, {
    // Add container here 👇
    container: document.body.appendChild(root),
  });
});
```

You can assert your HTML by `console.log(document.body.outerHTML)`

```html
<body>
  <div id="root">
    <!-- Your app's HTML -->
  </div>
</body>
```

Or just see it directly in a browser using [Jest Preview](https://github.com/nvh95/jest-preview)

<img align="center" src="https://user-images.githubusercontent.com/8603085/162563155-7e18c9ef-4fe3-45f2-9065-7fcea8ddb18e.gif" alt="Jest Preview Demo" />
