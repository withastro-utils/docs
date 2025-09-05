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

You can also manually configure that by adding the `onSubmitClick` attribute to the select.

```astro
<BSelect name="select" required onchange="submitForm(this)" onSubmitClick="consoleItButton">
    <BOption value="1">Option 1</BOption>
    <BOption value="2">Option 2</BOption>
</BSelect>

<BButton id="consoleItButton" onClick={onSubmit} class="hidden">This button is hidden</BButton>
```


### Search Input Example

Here's another example using a search input that triggers form submission:

```astro
---
import { Bind, BButton, BindForm, BInput } from '@astro-utils/forms/forms.js';

const form = Bind();

function onSearch(){
    console.log('Searching for:', form.searchQuery);
}
---
<BindForm bind={form}>
    <BInput name="searchQuery" placeholder="Enter search term..." onSubmitClick="searchButton" />
    <BButton id="searchButton" onClick={onSearch}>Search</BButton>

    <BButton onClick={() => {}} whenFormOK>No Search</BButton>
</BindForm>
```

This example shows how to:
- Use a search input that submits on Enter key press
- If we hav'nt used the 'onSubmitClick', it will default to the last button with 'whenFormOK' attribute