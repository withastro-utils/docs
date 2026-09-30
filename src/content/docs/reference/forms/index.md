---
title: Forms imports
description: Choose the right Astro Utils Forms entrypoint for middleware, components, and Astro configuration.
lastUpdated: 2026-09-12
---

Most application code imports from `@astro-utils/forms/forms.js`. The other entrypoints are used once during project setup.

## Build forms with `forms.js`

This is the main API for Astro pages and components. The page below assumes the [shared layout, middleware, and integration](/docs/guides/forms/getting-started/) are installed:

```astro title="src/pages/index.astro"
---
import { Bind, BindForm, BButton, BInput, FormErrors } from '@astro-utils/forms/forms.js';

import Layout from '../layouts/Layout.astro';

type AccountForm = {
	email: string;
};

const bind = Bind<AccountForm>();

async function createAccount() {
	console.log(bind.email);
}
---

<Layout>
	<span slot="title">Account form</span>

	<BindForm {bind}>
		<FormErrors />

		<label for="email">Email</label>
		<BInput id="email" name="email" type="email" required />

		<BButton onClick={createAccount} whenFormOK>Create account</BButton>
	</BindForm>
</Layout>
```

It exports:

- Form structure: `WebForms`, `BindForm`, and `FormErrors`
- Controls: `BInput`, `BTextarea`, `BSelect`, `BOption`, and `BButton`
- State: `Bind` and the `BindTypes` type
- Large uploads: `UploadBigFile`, `UploadBigFileProgress`, `BigFile`, and `processBigFileUpload`
- Response control: `ThrowOverrideResponse`

Continue with [basic components](./basic-form-components/), [data binding](./data-binding/), [events](./events-and-triggers/), or [large uploads](./upload-big-file/).

## Add WebForms To Layout

Use one `WebForms` root around your form content.

```astro title="src/layouts/Layout.astro"
---
import { WebForms } from '@astro-utils/forms/forms.js';
---
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title><slot name="title" /></title>
    </head>
    <body>
        <WebForms>
            <slot />
        </WebForms>
    </body>
</html>
```

## Add the middleware

The package root exports the Forms middleware as its default export. Add it to `src/middleware.ts`:

```ts title="src/middleware.ts"
import forms from '@astro-utils/forms';

export const onRequest = forms();
```

The middleware prepares form state, sessions, validation, and response handling for each request. See [configuration](./configuration/) for its options.

## Add the Astro integration

The integration entrypoint exports the Astro integration as its default export. Add it once in `astro.config.mjs`:

```js title="astro.config.mjs"
import { defineConfig } from 'astro/config';
import forms from '@astro-utils/forms/dist/integration.js';

export default defineConfig({
	integrations: [forms]
});
```

Start with the complete [installation and first form guide](/docs/guides/forms/getting-started/).
