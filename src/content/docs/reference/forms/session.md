---
title: Forms - session
description: Forms session
---

astro-utils form use session to save [CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF) validation secrets.

This session is based on json web token, and is save (encrypted) in the browser cookie.

## Using

Use can get the session with the activation of web forms

```astro
---
import { BButton } from "@astro-utils/forms/forms.js";
const { session } = Astro.locals;

function increase() {
  session.counter ??= 0;
  session.counter++;
}
---

<BButton onClick={increase}>++</BButton>
<p>Current counter: {amSession.counter}</p>
```

### Configuration

All the configuration is in the middleware creation.

`src/middleware.ts`

```ts
import astroFormsMiddleware from '@astro-utils/forms';
import {sequence} from 'astro/middleware';

export const onRequest = sequence(
    astroFormsMiddleware({
        secret: 'my-secret',
        session: {
            cookieName: 'session',
            cookieOptions: {
                httpOnly: true,
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
        },
    })
);
```
