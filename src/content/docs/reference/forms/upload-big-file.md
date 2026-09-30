---
title: Large file upload API
description: Configure chunked uploads, match progress controls, and handle failures.
lastUpdated: 2026-09-12
---

## Upload a file

The big file upload component is a simple way to upload large files to the server. It uses the `xhr` API to upload the file in chunks (and not all at once). This way, the server can handle large files without running out of memory.

It is also able to show the progress of the upload and handle errors (in the server side).

## Components

### UploadBigFile

Same as the `BInput` component, but for big files.

```astro title="src/pages/upload-big-file.astro"
---
import { type BigFile, BButton, Bind, BindForm, FormErrors, UploadBigFile, UploadBigFileProgress } from '@astro-utils/forms/forms.js';

import Layout from '../layouts/Layout.astro';

type Form = {
    file: BigFile;
}

const bind = Bind<Form>();
let showSubmitText = '';

function submit(){
    showSubmitText = `You uploaded ${bind.file.name} (${bind.file.size} bytes)`;
}
---
<Layout>
<span slot="title">Upload a file</span>
<BindForm {bind}>
    <FormErrors />
    <p>{showSubmitText}</p>

    <label for="file">File</label>
    <UploadBigFile id="file" name="file" required/>

    <BButton onClick={submit} whenFormOK>Submit</BButton>
</BindForm>
</Layout>
```

### UploadBigFileProgress

A progress bar connected to an `UploadBigFile` component.

```astro title="src/pages/upload-big-file.astro"
<UploadBigFile name="file" required/>
<UploadBigFileProgress for="file" />
```

## Configure upload limits

Pass limits through your Forms middleware. This is a configuration example, not a type declaration:

```ts title="src/middleware.ts"
import forms from '@astro-utils/forms';
export const onRequest = forms({
    secret: import.meta.env.FORMS_SECRET,
    forms: {
        bigFilesUpload: {
            bigFileClientOptions: { chunkSize: 5 * 1024 * 1024, parallelChunks: 2, retryChunks: 3 },
            bigFileServerOptions: { maxUploadSize: 20 * 1024 * 1024, maxUploadTime: 5 * 60 * 1000 }
        }
    }
});
```

Sizes are bytes and `maxUploadTime` is milliseconds. The example caps a file at 20 MiB and configures five minutes as the age limit used when cleaning temporary uploads; this is not a guaranteed transfer timeout. Choose limits and a temporary directory that fit your deployment.

## Match the progress control

`for="file"` targets the upload control's `name="file"`, not its HTML `id`. Keep this pairing consistent when adding a custom ID for a label.

## Explain failures to the user

An interrupted or rejected upload may never reach the button callback. Do not report success until that callback completes. In your application, show the failure near the input and let the user retry; `FormErrors` handles form validation, not every transport failure.

The [upload example](/docs/examples/upload/) provides a simulated failure mode so you can compare success and retry feedback without transferring a file. For server processing failures inside your callback, catch the error and render a request-local message without exposing internal paths or exception details.
