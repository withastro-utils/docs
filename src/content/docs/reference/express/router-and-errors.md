---
title: Router and errors
description: ExpressRoute middleware, body parsing, validation, route creation, and error classes.
lastUpdated: 2026-09-12
---

## Compose middleware and a handler

```ts title="src/pages/api/status.ts"
import { ExpressRoute } from '@astro-utils/express-endpoints';

const router = new ExpressRoute();

router.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

export const GET = router.route((_req, res) => {
    res.json({ status: 'ready' });
});
```

`next()` allows the final handler to run. A middleware that sends a response should return without calling it.

## `ExpressRoute`

| Method | Behavior |
| --- | --- |
| `use(middleware)` | Appends middleware or another router and returns this router. |
| `body(type)` | Sets parsing to `auto`, `json`, `multipart`, `urlencoded`, or `text`. |
| `validate(schemas)` | Adds Zod Express validation to the next route. |
| `route(...handlers)` | Returns an Astro `APIRoute`. |

Body parsing runs only for `POST`, `PUT`, and `PATCH`. In `auto` mode, the request `Content-Type` selects the parser.

Middleware stops unless it calls `next()`. A handler must write or end the response before the Astro route can complete.

## Errors

`ExpressError` represents response lifecycle and header errors. `ExpressBodyError` extends it for body parsing failures.

Multipart parser failures are recorded on `req.error`. Other uncaught errors return their message using `error.status` when present, otherwise status 500.

## Handle an application error

```ts title="src/pages/api/double.ts"
import { ExpressRoute } from '@astro-utils/express-endpoints';

const router = new ExpressRoute();

export const GET = router.route((req, res) => {
    const value = Number(req.query.value);
    if (req.query.value == null || !Number.isFinite(value)) {
        res.status(400).json({ error: 'Supply a numeric value query parameter.' });
        return;
    }
    res.json({ result: value * 2 });
});
```

Call `/api/double?value=4` for `{"result":8}`, or omit `value` to see the explicit JSON error. Catch application failures where you can turn them into a useful response. Do not expose internal exception details to callers. `ExpressError.code` is not the same property as the router’s `error.status` fallback; explicitly set the response status when handling an error.
