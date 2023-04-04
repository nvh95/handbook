---
slug: remove-old-service-worker
title: Remove old service worker
authors: [nvh95]
tags: [service worker]
---

Recently, I migrated a documentation page from Gatsby to Docusaurus. However, after I deployed a new version of the docs but I still see the cached version of the old docs. The reason is that the Gatsby version of the docs has a service worker that caches the artifacts. So, I need to remove the old service worker manually via Chrome Devtools.

<!--truncate-->

However, this is not a good solution for all of my users. So, I decided to add a script to remove the old service worker. The script is as follows:

```js
navigator?.serviceWorker?.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});
```

Source: <https://stackoverflow.com/a/33705250/3422559>

I put it inside an `useEffect` hook in a react component. Based on your framework, you can put it in the corresponding place.

I am not sure if this is the best solution. If you have a better solution, please let me know. Thanks a ton.
