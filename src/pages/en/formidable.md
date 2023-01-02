---
title: Formidable
description: Astro-Metro formidable port
layout: ../../layouts/MainLayout.astro
---
Allow you to use formidable to parse request body.

With formidable you can parse multi-part forms (file upload).

## Installation
Install the package by running
```bash
npm i @metro-astro/formidable
```

## Using formidable
### Endpoint

`pages/upload.json.ts`
```ts
import {parseAstroForm, isFormidableFile} from '@astro-metro/formidable';

export const post: APIRoute = ({ request }) => {
    const formData: FormData = await parseAstroForm(Astro.request);
    let name = 'Not-File'

    const file = formData.get('file');
    if(isFormidableFile(file)){
        name = file.name;
    }

    return {
        body: name
    }
}
```

### Astro Page
`pages/index.page`
```astro
---
import {parseAstroForm, isFormidableFile} from '@astro-metro/formidable';

if(Astro.request.method === "POST"){
    const formData: FormData = await parseAstroForm(Astro.request);

    const file = formData.get('my-file');
    if(isFormidableFile(file)){
        console.log('The user upload a file');
    }
}
---
```

## Note
This package is used in `@astro-metro/forms`. You don't need to do anything to enable file upload if you already using `@astro-metro/forms`.