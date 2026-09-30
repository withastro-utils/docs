---
title: Request API
description: Parsed values and content-negotiation helpers available on ExpressRequest.
lastUpdated: 2026-09-12
---

## Read a JSON request

```ts title="src/pages/api/profile.ts"
import { ExpressRoute } from '@astro-utils/express-endpoints';
import z from "zod";

const router = new ExpressRoute();
router.body('json');

router.validate({
    body: z.object({
        name: z.string()
    }),
    query: z.object({
        page: z.coerce.number()
    })
});

export const POST = router.route((req, res) => {
    res.json({ 
        name: req.body.name,
        page: req.query.page ?? 1, 
        userAgent: req.get('user-agent') 
    });
});
```

## Read an uploaded file

```ts title="src/pages/api/upload-info.ts"
import { ExpressRoute } from '@astro-utils/express-endpoints';

const router = new ExpressRoute();
router.body('multipart');

export const POST = router.route((req, res) => {
    if (req.error) {
        res.status(400).json({ error: 'The upload could not be parsed.' });
        return;
    }

    const file = req.filesOne.document;
    if (!file) {
        res.status(400).json({ error: 'Attach a file in the document field.' });
        return;
    }
    
    res.json({ name: file.name, bytes: file.size });
});
```

Send multipart form data with a field named `document`. Use `filesMany.document` when the field accepts several files.

## Values

| Property | Value |
| --- | --- |
| `astroContext` | Original Astro `APIContext` |
| `body` | Parsed body |
| `query`, `params`, `headers` | String maps |
| `cookies` | Parsed cookie values |
| `session`, `locals` | Values supplied by Astro middleware |
| `filesOne` | First native `File` for each multipart field |
| `filesMany` | Every native `File` for each multipart field |
| `method`, `url`, `originalUrl`, `path` | Request routing values |
| `hostname`, `subdomains`, `ip` | Connection values |
| `error` | Multipart parsing error, when present |

## Helpers

| Method | Behavior |
| --- | --- |
| `get(name)` | Gets a request header case-insensitively. |
| `header(name, fallback?)` | Gets a header with an optional fallback. |
| `is(type)` | Compares the request content type. |
| `param(name, fallback?)` | Checks params, then body, then query. |
| `accepts(types, ...types)` | Negotiates media types. |
| `acceptsCharsets(types, ...types)` | Negotiates character sets. |
| `acceptsEncodings(types, ...types)` | Negotiates encodings. |
| `acceptsLanguages(types, ...types)` | Negotiates languages. |
