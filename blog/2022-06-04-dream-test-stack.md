---
slug: dream-fe-test-stack
title: Dream Frontend Test Stack
authors: [nvh95]
tags: [react, testing]
---

This is my dream frontend test stack, to test my React applications:

- **Jest**: Jest is a delightful JavaScript Testing Framework with a focus on simplicity. https://jestjs.io
- **React Testing Library:** To render the app "as real as possible", but in JSDOM https://testing-library.com/docs/react-testing-library/intro
- **User event:** To interactive with the app (usually rendered by React Testing Library) as a normal user https://testing-library.com/docs/user-event/intro
- **msw:** To eliminate all the API mocking at the app level. `msw` mocks your API requests at the network level. You just write the actual code that calls API, `msw` will act as a real server. We can re-use `msw` for development and writing tests. https://mswjs.io
- **jest-preview:** To preview the app when testing with Jest. No more looking at HTML on Terminal, just a beautiful UI in the browser. https://www.jest-preview.com
