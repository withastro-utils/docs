---
title: Advanced responses
description: Return a custom response from a nested Forms operation.
lastUpdated: 2026-09-12
---

## Stop processing and return a response

This is an Astro frontmatter excerpt for a page using the [Forms setup](/docs/guides/forms/getting-started/). A nested operation throws to stop page processing immediately:

```astro title="src/pages/account.astro"
---
import { ThrowOverrideResponse } from '@astro-utils/forms/forms.js';

function requireUser() {
    if (!Astro.locals.session.userId) {
        throw new ThrowOverrideResponse(Astro.redirect('/login'));
    }
}
requireUser();
---
```

Your authentication system must set `session.userId` after verifying the user. This guard is not an authentication implementation.

## Return a custom body

```astro title="src/pages/export.astro"
---
import { ThrowOverrideResponse } from '@astro-utils/forms/forms.js';

throw new ThrowOverrideResponse(new Response('name\nAlex\n', {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' }
}));
---
```

## Constructor behavior

| Argument | Behavior |
| --- | --- |
| `response` | Optional native `Response` (or `null`). |
| `message` | Optional fallback message. |

If no response is supplied, Forms uses `Astro.locals.forms.overrideResponse`. If that is also missing, the fallback message is returned with status 500. The default message is `An error occurred, please try again later.`

For an ordinary redirect from a button callback, use the [redirect helper](/docs/guides/forms/js-helpers/).
