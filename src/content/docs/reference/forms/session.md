---
title: Session
description: Configure a signed session cookie and share small values between Forms pages.
lastUpdated: 2026-09-12
---

Astro Utils Forms uses a session to store [CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF) validation secrets and application values.

The session is stored as an signed JSON Web Token in a browser cookie.

## Read and update session values

Access the session through `Astro.locals` inside a page wrapped by `WebForms`.

```astro title="src/pages/session.astro"
---
import { BindForm, BButton } from "@astro-utils/forms/forms.js";
const { session } = Astro.locals;
session.counter ??= 0;

function increase() {
  session.counter++;
}
---
<BindForm>
    <p>Current counter: {session.counter}</p>
    <BButton onClick={increase}>++</BButton>
</BindForm>
```

### Configuration

All the configuration is in the middleware creation.

```ts title="src/middleware.ts"
import astroFormsMiddleware from '@astro-utils/forms';
import {sequence} from 'astro/middleware';

export const onRequest = sequence(
    astroFormsMiddleware({
        secret: import.meta.env.FORMS_SECRET,
        session: {
            cookieName: 'session',
            cookieOptions: {
                httpOnly: true,
                sameSite: 'lax',
                secure: import.meta.env.PROD,
                maxAge: 60 * 60 * 24 * 7,
            },
        },
    })
);
```

## Lifetime and contents

`maxAge` is measured in seconds; the example lasts seven days. Keep `FORMS_SECRET` stable across restarts. An expired or invalid token starts an empty session; changing the signing secret invalidates existing sessions.

A signature detects tampering; it does **not** hide the payload from the cookie holder. Store small identifiers and preferences, not passwords or confidential records. Cookies have a limited size and accompany requests, so move growing lists and durable data into application storage. Set `secure` for HTTPS deployments; local HTTP development needs it disabled.
