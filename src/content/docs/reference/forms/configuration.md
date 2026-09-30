---
title: Forms configuration
description: Middleware settings for sessions, large uploads, secrets, and logging.
lastUpdated: 2026-09-12
---

After completing the [Forms setup](/docs/guides/forms/getting-started/), pass settings to the middleware export in this file:

```ts title="src/middleware.ts"
import forms from '@astro-utils/forms';

export const onRequest = forms({
    secret: import.meta.env.FORMS_SECRET,
    session: {
        cookieName: 'session',
        cookieOptions: { httpOnly: true, sameSite: 'lax', secure: import.meta.env.PROD }
    },
    forms: {
        bigFilesUpload: {
            bigFileServerOptions: { maxUploadSize: 250 * 1024 * 1024 }
        }
    }
});
```

| Setting | Purpose |
| --- | --- |
| `secret` | Stable secret used by protected form state. Set this in production. |
| `session.cookieName` | Session cookie name. Default: `session`. |
| `session.cookieOptions` | Cookie serialization options. Defaults include HTTP-only, same-site lax, path `/`, and an age limit. |
| `forms.bigFilesUpload.bigFileClientOptions` | Chunk size, parallelism, retries, and retry delays. |
| `forms.bigFilesUpload.bigFileServerOptions` | Upload policy, size, duration, directory, and completion callback. |
| `logs(type, message)` | Receives middleware log events. |

Keep secrets outside source control. Set `secure: import.meta.env.PROD` for HTTPS production cookies and enforce upload policy before accepting untrusted files.

## Development and deployment

Before using the configuration above, set `FORMS_SECRET` in your environment (or an untracked local `.env` file). Generate a random value with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Copy that value into the environment variable; never commit it. For an initial local experiment without custom settings, use `forms()` as shown in Getting Started.


Use a stable environment secret for deployed projects. `import.meta.env.PROD` enables secure cookies in the HTTPS production configuration while allowing local HTTP development. The middleware initializes request state; pages still need the integration and one `WebForms` root.
