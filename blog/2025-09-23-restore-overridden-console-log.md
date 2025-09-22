---
slug: restore-overridden-console-log
title: Restore Overridden console.log
authors: [nvh95]
tags: [javascript, debugging]
---

Sometimes during development, you might encounter situations where `console.log` has been overridden. This commonly happens in production builds where logging is disabled to prevent exposing sensitive information or to improve performance. However, when debugging, you might need to restore the original `console.log` functionality.

<!-- truncate -->

## The Problem

Many applications override the default `console.log` function in production environments:

```js
// Example of overriding console.log in production
if (process.env.NODE_ENV === 'production') {
  console.log = function() {};  // Do nothing in production
}
```

This can make debugging difficult when you need to inspect values in a production environment or in any context where `console.log` has been disabled or modified.

## The Solution: Using an iframe

You can restore the original `console.log` functionality by leveraging an iframe. Here's the code snippet:

```js
var i = document.createElement('iframe');
i.style.display = 'none';
document.body.appendChild(i);
window.console = i.contentWindow.console;
```

## How It Works

This technique works because of how iframes function in the browser:

1. **Isolated Environment**: Each iframe has its own execution context and global objects, including its own `console` object.

2. **Fresh Console Object**: When you create a new iframe, it gets a fresh, unmodified `console` object that hasn't been affected by any overrides in the parent window.

3. **Accessing the iframe's Console**: By accessing `i.contentWindow.console`, you're retrieving the pristine console object from the iframe's window.

4. **Replacing the Main Window's Console**: Finally, by assigning `window.console = i.contentWindow.console`, you replace the overridden console in the main window with the untouched version from the iframe.

The iframe is hidden with `i.style.display = 'none'` so it doesn't affect the page's appearance.

## When to Use This Technique

This approach is particularly useful in scenarios like:

- Debugging production issues where console logging has been disabled
- Working with third-party libraries that override console methods
- Examining applications where console output has been modified for security or performance reasons
- Restoring console functionality in environments where it has been customized

## Considerations

- This technique will reset all console methods, not just `console.log`
- Any custom console methods added to the original console object will be lost
- The iframe needs to be created after the DOM is ready
- Some environments with strict Content Security Policy (CSP) might restrict iframe creation
