---
title: Client Side Events & Triggers
description: Forms client side events & submit triggers
---

## Client Side Events

You can listen to submit events to handle the loading while the form is being submitted.

```ts
type SubmitInfo = {
    button: HTMLButtonElement, 
    uploads: {count: number, totalSize: number} // only for big files
};

document.addEventListener('WFSubmitting', ({detail}: {details: SubmitInfo}) => {
    const {button, uploads} = details;

    button.classList.add('loading');
    console.log('Form is being submitted');
});
```

## Submit Triggers

If you want custom event to submit the form, you can use the `submitForm` global function.

```astro
---
import { Bind, BButton, BindForm } from '@astro-utils/forms/forms.js';

const form = Bind();

function onSubmit(){
    console.log(form.select);
}
---
<BindForm bind={form}>
    <BSelect name="select" required onchange="submitForm(this)">
        <BOption value="1">Option 1</BOption>
        <BOption value="2">Option 2</BOption>
    </BSelect>

    <BButton onClick={onSubmit} class="hidden">This button is hidden</BButton>
</BindForm>
```


### Select button 
It will try to select the best BButton in this BindForm.

The order of selection is:
1. The last BButton with the `whenFormOK` attribute.
2. Last BButton in the form.

You can also manually configure that by adding the `data-submit` attribute to the select.

```astro
<BSelect name="select" required onchange="submitForm(this)" data-submit="consoleItButton">
    <BOption value="1">Option 1</BOption>
    <BOption value="2">Option 2</BOption>
</BSelect>

<BButton id="consoleItButton" onClick={onSubmit} class="hidden">This button is hidden</BButton>
```