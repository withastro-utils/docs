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

## Adding integration

Edit your `astro.config.ts` to add the integration
```ts
import { defineConfig } from 'astro/config';
import forms from '@metro-astro/forms';

export default defineConfig({
    integrations: [forms]
});
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