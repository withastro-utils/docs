---
title: Forms - Getting started
description: Getting started with astro-metro forms
layout: ../../../layouts/MainLayout.astro
---

## Installation

First install the package
```bash
npm i @metro-astro/forms
```

## Adding integration & middleware

Edit your `astro.config.ts` to add the integration
```ts
import { defineConfig } from 'astro/config';
import amDebug from "@astro-metro/forms/dist/integration.js";

export default defineConfig({
  output: 'server',
  integrations: [amDebug],
  experimental: {
    middleware: true
  }
});
```
This integration will easy you debugging by avoiding the browser popups every vite reload.


Edit 
`src/middleware.ts` to add the middleware
```ts
import amMiddleware from "@astro-metro/forms";
import {sequence} from "astro/middleware";

export const onRequest = sequence(amMiddleware());
```


## Editing Main Layout

Add `WebForms` component to the main project layout

```astro
---
import { WebForms } from "@astro-metro/forms/forms.js";

export interface Props {
  title: string;
}

const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <WebForms>
      <slot />
    </WebForms>
  </body>
</html>
```