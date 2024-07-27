---
title: Upload Big File Component
description: Uploading Big Files with Astro Utils
---

## Big File Upload

The big file upload component is a simple way to upload large files to the server. It uses the `xhr` API to upload the file in chunks (and not all at once). This way, the server can handle large files without running out of memory.

It is also able to show the progress of the upload and handle errors (in the server side).

## Components

### UploadBigFile

Same as the `BInput` component, but for big files.

```astro
---
import { BigFile, Bind, FormErrors, BButton } from '@astro-utils/forms/forms.js';

type Form = {
    file: BigFile 
    showSubmitText: string;   
}

const bind = Bind<Form>();
function formSubmit(){
    showSubmitText = `You uploaded ${form.file.name} (${form.file.size} bytes)`;
}
---
<BindForm bind={bind}>
    <FormErrors />
    <p>{showSubmitText}</p>
    <UploadBigFile name="file" required/>

    <BButton onClick={formSubmit} whenFormOK>Submit</BButton>
</BindForm>
```

### UploadBigFileProgress

A progress bar connected to a `UploadBigFile` component.

```astro
<UploadBigFile name="file" required/>
<UploadBigFileProgress for="file" />
```

## Configuration

All configuration is done through the middleware. The following options are available:

```ts
type MiddlewareOptions = {
    forms?: {
        bigFilesUpload?: {
            bigFileClientOptions?: {
                retryChunks?: number; // default: 5
                chunkSize?: number; // default: 5MB
                parallelChunks?: number; // default: 3
                parallelUploads?: number; // default: 3
            },
            bigFileServerOptions?:  {
                maxUploadTime?: number; // default: 1.5 hours
                maxUploadSize?: number; // default: 1GB
                maxDirectorySize?: number; // default: 50GB
                tempDirectory?: string; // default: path.join(os.tmpdir(), "astro_forms_big_files_uploads")
            };
        }
    }
}
```