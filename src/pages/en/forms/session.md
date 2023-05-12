---
title: Forms - session
description: Astro-Metro forms session
layout: ../../../layouts/MainLayout.astro
---

Astro-Metro form use session to save [CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF) validation secrets
This session is base on json web token, and is save encrypted in the browser cookie.

## Using

Use can get the session with the activation of web forms

```astro
---
import { Button } from "@astro-metro/forms/forms.js";
const { amSession } = Astro.locals;

function increase() {
  amSession.counter ??= 0;
  amSession.counter++;
}
---

<Button onClick={increase}>++</Button>
<p>Current counter: {amSession.counter}</p>
```

### Configuration

All the configuration are in the middleware creation.

`src/middleware.ts`

```ts
import amMiddleware from "@astro-metro/forms";
import { sequence } from "astro/middleware";

export const onRequest = sequence(
  amMiddleware({
    secret: "my-secret",
    session: {
      cookieName: "session",
      cookieOptions: {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    },
  })
);
```
