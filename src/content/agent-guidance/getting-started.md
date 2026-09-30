# Build with Astro Utils

Start here when implementing an Astro Utils feature. These instructions accompany the current documentation source; check your installed package versions before relying on an API. Browser previews simulate server behavior and do not demonstrate a deployed backend.

## Choose the utility

- Forms: bound fields, validation, server callbacks, state, sessions, and chunked uploads.
- Context: request-local values shared between Astro components. It is not persistent storage.
- Express Endpoints: middleware, request parsing, and response helpers for Astro API routes.

## Install and configure Forms

Use the complete [Forms setup](/docs/guides/forms/getting-started/index.md). Install `@astro-utils/forms` and `@astrojs/node` using npm, pnpm, Yarn, or Bun. Configure on-demand rendering, the Forms integration, middleware, and one shared `WebForms` layout. The exact setup files are included below.

<!-- SETUP -->

For deployment, follow [configuration](/docs/reference/forms/configuration/index.md) and supply a stable environment secret. Do not commit secrets. Sessions are signed, not encrypted; do not treat them as permanent application storage.

## Build the product filter

This complete example uses a local catalog and requires no database. Copy the files to their labeled paths. Run your project's `dev` script, open `/products`, and submit budgets of 10, 50, and 100. Expect zero, two, and three results. Negative and empty budgets must fail validation.

<!-- PRODUCTS -->

## Build the homepage collection search

This example searches an Astro content collection on the server. It does not make a live database query. For database-backed products, replace `getCollection` with your application's database query inside the callback; do not assume an unspecified database client exists.

Add the following collection to `src/content.config.ts`, merging it with existing collections. The inline loader makes this sample self-contained; replace it with your actual catalog source as needed.

```ts title="src/content.config.ts"
import { defineCollection, z } from 'astro:content';
const products = defineCollection({
    loader: async () => [
        { id: 'notebook', name: 'Notebook', price: 12 },
        { id: 'lamp', name: 'Desk lamp', price: 35 },
        { id: 'headphones', name: 'Headphones', price: 79 }
    ],
    schema: z.object({ name: z.string(), price: z.number() })
});
export const collections = { products };
```

<!-- SEARCH -->

Run `astro sync` to generate collection types, then your project's `dev` script. Open `/search`. Search “lamp” to see Desk lamp, an unknown name for no results, and clear the field to show the whole collection.

## Execution and state

`WebForms` handles the submission. `BindForm` restores bound values, bound controls validate input, and a button invokes its server callback. `whenFormOK` restricts callbacks to valid submissions. Astro then renders the updated result. A request-local variable is not durable state. Use bound state, sessions, or application storage according to the lifetime you need.

## Find the right recipe

- [Binding and validation](/docs/guides/forms/data-binding/index.md)
- [Tasks](/docs/examples/todo/index.md)
- [Preferences](/docs/examples/settings/index.md)
- [Upload progress](/docs/examples/upload/index.md)
- [Draft service requests](/docs/examples/government-form/index.md)
- [Login feedback](/docs/examples/login/index.md): illustrative demo credentials, not production authentication.
- [Account fields](/docs/examples/signup/index.md): does not create real database accounts.
- [Context](/docs/guides/context/index.md)
- [HTTP endpoints](/docs/guides/express-endpoints/index.md)
- [All documentation](/docs/llms.txt)

## Check your implementation

1. Verify imports against the relevant API reference; do not invent events or component props.
2. Run `astro check` and your project's build. Test the real server route, not only a documentation preview.
3. Exercise successful submission, invalid input, empty results, and repeated submissions.
4. Confirm which state survives a request or reload. Keep passwords out of persisted view state.
5. For uploads, test interruption and retry; the progress component's `for` value matches the field name.
6. Confirm any external database, authentication, or storage service separately. Static snippet compilation does not certify those integrations.
