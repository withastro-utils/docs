---
title: Response API
description: Status, headers, bodies, redirects, files, cookies, and streaming with ExpressResponse.
lastUpdated: 2026-09-12
---

## Return JSON with status and headers

```ts title="src/pages/api/status.ts"
import { ExpressRoute } from '@astro-utils/express-endpoints';

const router = new ExpressRoute();
export const GET = router.route((_req, res) => {
    res.status(200);
    res.set('Cache-Control', 'no-store');
    res.json({ status: 'ready', checkedAt: new Date().toISOString() });
});
```

A GET to `/api/status` returns JSON with an explicit status and cache policy. Set headers before sending the body; `json()` finishes the response.


`ExpressResponse` is a writable stream. Set status and headers before the first `write()` or `end()` call.

## Save a preference and redirect

```ts title="src/pages/api/preferences.ts"
import { ExpressRoute } from '@astro-utils/express-endpoints';

const router = new ExpressRoute();
export const POST = router.route((_req, res) => {
    res.cookie('theme', 'dark', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 86400000 }); // maxAge in milliseconds
    res.redirect('/', 303);
});
```

The cookie stores a display preference, not an authentication credential. Use secure cookies when serving over HTTPS. A 303 redirects the browser to a GET after the POST.

## Stream a text response

```ts title="src/pages/api/report.ts"
import { ExpressRoute } from '@astro-utils/express-endpoints';

const router = new ExpressRoute();
export const GET = router.route((_req, res) => {
    res.type('text/plain');
    res.write('Report started\n');
    res.end('Report complete\n');
});
```

Set headers before the first write, and always end the response. For a file already on disk, use `sendFile` or `attachment` instead.

## Finish a response

| Method | Behavior |
| --- | --- |
| `status(code)` | Sets `statusCode`. |
| `sendStatus(code)` | Sends the standard status text. |
| `send(body)` | Sends bytes, text, or JSON-compatible data. |
| `json(value)` | Sends JSON. |
| `html(value)` | Sends HTML. |
| `end(body?)` | Ends the response. |
| `write(chunk, encoding?)` | Starts or continues a streamed response. |
| `redirect(url, status?)` | Redirects with status 302 by default. |
| `sendFile(path)` | Streams a file and infers its content type. |
| `attachment(path, name?)` | Streams a file as a download. |

## Headers and cookies

| Method | Behavior |
| --- | --- |
| `set()` / `header()` | Sets one header or a header map. |
| `get()` / `getHeader()` | Reads a header. |
| `getHeaders()` / `getHeaderNames()` | Lists response headers. |
| `hasHeader()` / `removeHeader()` | Checks or removes a header. |
| `append()` / `appendHeader()` | Appends a header value. |
| `type(value)` | Sets a MIME content type. |
| `writeHead(code, headers?)` | Sets status and headers, then starts the response. |
| `cookie(name, value, options?)` | Appends a `Set-Cookie` header. Object values use JSON cookie encoding. |
| `clearCookie(name, options?)` | Expires a cookie. |
| `cacheControl({ minuets, days, months })` | Sets `max-age`. The public minute option is spelled `minuets`. |

`headersSent` becomes true after the response starts. Header changes and duplicate response endings then throw `ExpressError`.
