---
title: Context API
description: Context component, getContext, and asyncContext contracts for Astro Utils Context.
lastUpdated: 2026-09-12
---

## `Context`

```astro title="src/layouts/Layout.astro"
---
import Context from '@astro-utils/context/Context.astro';
---
<Context contextName="theme" color="blue">
    <slot />
</Context>
```


## `getContext(Astro, name?)`

Returns the nearest value for `name`, or `{}` when no provider is active. The default name is `"default"`.

```astro title="src/components/ContextContent.astro"
---
import getContext from '@astro-utils/context';

const theme = getContext(Astro, 'theme');
---
```

## `asyncContext(promise, Astro, options?)`

Runs an async render while the supplied context is active and always cleans it up afterward.

```astro title="src/components/ContextContent.astro"
---
import { asyncContext } from '@astro-utils/context';

const html = await asyncContext(() => Astro.slots.render('default'), Astro, {
    name: 'theme',
    context: { color: 'blue' }
});
---
```

| Option | Type | Default |
| --- | --- | --- |
| `name` | `string` | `"default"` |
| `context` | `unknown` | `Astro.props` |


Start with the [connected provider/consumer example](/docs/guides/context/) before managing slot rendering manually.
