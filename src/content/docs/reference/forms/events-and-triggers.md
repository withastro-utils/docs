---
title: Client-side events & triggers
description: Observe submission and choose which bound button handles a browser event.
lastUpdated: 2026-09-12
---

## Show submission feedback

```ts

document.addEventListener('WFSubmitting', (event) => {
    const { button } = (event as CustomEvent<{ button: HTMLButtonElement }>).detail;

    console.log(button.name, 'submitted!')
});

```

`WFSubmitting` reports the start of a form submission, but it does not guarantee completion. For stalled or failed uploads, provide explicit error or retry feedback; do not invent a completion event.

## Submit from a select

To submit a form from another browser event, use the global `submitForm` function.

```astro title="src/pages/events-and-triggers.astro"
---
import { Bind, BButton, BindForm, BSelect, BOption } from '@astro-utils/forms/forms.js';

type SelectForm = {
    select: string;
};

const bind = Bind<SelectForm>();

function onSubmit(){
    console.log(bind.select);
}
---
<BindForm {bind}>
    <label for="select">Selection</label>
    <BSelect id="select" name="select" required onchange="submitForm(this)">
        <BOption value="1">Option 1</BOption>
        <BOption value="2">Option 2</BOption>
    </BSelect>

    <BButton onClick={onSubmit} hidden>This button is hidden</BButton>
</BindForm>
```


### Choose the action
It will try to select the best BButton in this BindForm.

The order of selection is:
1. The last BButton with the `whenFormOK` attribute.
2. Last BButton in the form.

You can also manually configure that by adding the `onSubmitClick` attribute to the select.

```astro title="src/pages/events-and-triggers.astro"
<BSelect name="select" required onchange="submitForm(this)" onSubmitClick="consoleItButton">
    <BOption value="1">Option 1</BOption>
    <BOption value="2">Option 2</BOption>
</BSelect>

<BButton id="consoleItButton" onClick={onSubmit} hidden>This button is hidden</BButton>
```


### Submit a search on Enter

Here's another example using a search input that triggers form submission:

```astro title="src/pages/events-and-triggers.astro"
---
import { Bind, BButton, BindForm, BInput } from '@astro-utils/forms/forms.js';

type SearchForm = {
    searchQuery: string;
};

const bind = Bind<SearchForm>();

function onSearch(){
    console.log('Searching for:', bind.searchQuery);
}
---
<BindForm {bind}>
    <label for="searchQuery">Search</label>
    <BInput id="searchQuery" name="searchQuery" placeholder="Enter search term..." onSubmitClick="searchButton" />
    <BButton id="searchButton" onClick={onSearch}>Search</BButton>

    <BButton onClick={() => {}} whenFormOK>No Search</BButton>
</BindForm>
```

This example shows how to:
- Use a search input that submits on Enter key press
- Without `onSubmitClick`, submission defaults to the last button with `whenFormOK`.


### Update state without an action

When you only want to update the form state - reload the form without the need to click on a submit button.

```astro
<label>
    <BInput type="checkbox" name="showContent" onchange="submitForm(this)" onSubmitClick="state"/> Show content
</label>

{bind.showContent ? 'Content is shown' : 'Content is hidden'}
```


### WebForms Options

```astro
<WebForms loadingClassName="button-loading" preservePageScroll>
    <BindForm>
        ...
        <BButton onClick={...}>Submit</BButton> <!-- class name will be added on submission -->
    </BindForm>
</WebForms>
```

`preservePageScroll` - default true, will ensure the page will be scrolled to the exact same potions after form submission.

`loadingClassName` - the class name that will be added to the button being submitted to indicate a loading state.