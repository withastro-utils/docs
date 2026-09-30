---
title: Data binding API
description: Bind defaults, persisted state, validation results, and lifecycle hooks.
lastUpdated: 2026-09-12
---

For a complete walkthrough, start with [Binding & Validation](/docs/guides/forms/data-binding/). The snippets here describe individual contracts; Astro frontmatter examples run inside a page using the [shared layout](/docs/guides/forms/getting-started/#4-add-the-shared-layout).

## Create a bind

```astro title="src/pages/profile.astro"
---
import { Bind } from '@astro-utils/forms/forms.js';

type Form = { 
    name: string; 
    age: number 
};
const bind = Bind<Form>({ name: 'Unknown', age: 18 });
---
```

Defaults are optional. If you supply a typed defaults object, provide all required fields in that type. Inputs with matching `name` attributes read and update those properties on submission.

## Bind members

| Member | Purpose |
| --- | --- |
| Application fields | Values read and written by named controls. |
| `errors` | Validation errors, including the field name, submitted value, issues, and message. |
| `defaults()` | Reassigns the initial defaults. |
| `on.newState` | Runs when no previous view state was restored. |
| `on.stateLoaded` | Runs after state has been loaded. |
| `on.reloadState` | Refreshes parent data when a child requests a rerender. |

## Persist selected state

```astro title="src/pages/profile.astro"
<BindForm {bind} omitState={['message']}>
    <slot />
</BindForm>
```

`omitState` excludes fields from the next persisted view state. Use it for transient messages; keep passwords out of persisted state. Request-local variables are another way to display feedback for only the current response.

## Custom validation

```astro title="src/pages/profile.astro"
---
function validateName(value: string) {
    if (value.trim().toLowerCase() === 'admin') {
        return { code: 'reserved_name', error: 'This name is reserved.' };
    }
}
---
```

Pass the function as `validate={validateName}` on a bound input. It may return a promise. Return nothing to accept, `{ error, code? }` to reject, or `{ value }` to replace the parsed value. The current implementation applies a replacement only when it is truthy; use another approach for replacements such as `0`, `false`, or an empty string. A Zod schema is also accepted.

`FormErrors` displays the errors. Put `whenFormOK` on actions that must only run after successful validation.

## State values

View state supports SuperJSON values such as dates, maps, and sets in addition to ordinary serializable data. Do not store functions, live connections, or large datasets in it. Use [sessions](/docs/reference/forms/session/) for small cross-page values and application storage for durable data.
