---
title: Context
description: Astro-Metro Context
layout: ../../layouts/MainLayout.astro
---
Save context between components.

Allow you to add extra props without the need to manually add them every time.

## Installation
Install the package by running
```bash
npm i @metro-astro/context
```

## Usage

`layouts/Layout.astro`
```astro
---
import Context from '@astro-metro/context/Context.astro';

function consoleIt(){
    console.log('Hi');
}
---
<Context title="Context is cool" consoleIt={consoleIt}>
    <slot/>
</Context>
```

`components/LayoutTitle.astro`
```astro
---
import getContext from '@astro-metro';

const {title, consoleIt} = getContext(Astro);
consoleIt();
---
<h2>{title}</h2>
```

`pages/index.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
import LayoutTitle from '../components/LayoutTitle.astro';
---
<Layout>
    <LayoutTitle/>
</Layout>
```

## Functions

```ts
// if you are module/lib, change the name accordingly
function getContext(astro: AstroGlobal, name = "default"): {[key: string]: any}
```

Every new context inherit the last one


```ts
async function asyncContext<T>(promise: () => Promise<T>, astro: AstroGlobal, { name = "default", context = astro.props}): Promise<T>
```

Same as `Context.astro`, help you render astro inside the props context

### Example

```ts
const htmlSlot = await asyncContext(() => Astro.slots.render('default'), Astro, {name: "default"});
```
