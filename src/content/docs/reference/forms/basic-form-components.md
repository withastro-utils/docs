---
title: Basic Form Components
description: Bound inputs, select controls, buttons, and validation feedback.
lastUpdated: 2026-09-12
---

The template excerpts below belong inside a `BindForm` using the [shared Forms setup](/docs/guides/forms/getting-started/). Import the components you use from `@astro-utils/forms/forms.js`.

## Inputs
### BInput

The basic component for most form fields.

```astro
<label for="meetingDate">Meeting date</label>
<BInput id="meetingDate" type="date" name="meetingDate" min="2026-01-01" max="2026-12-31" required/>
```

It includes the following attributes:

- **type** - HTML input types: `text`, `checkbox`, `date`, `email`, `number`, `radio`, `file`... / `int`
- **min** - number / date
- **max** - number / date
- **minlength** - minimum text length
- **maxlength** - maximum text length
- **pattern** - regex pattern for text
- **multiple** - for files
- **required** - a value must be provided
- **readonly** - make the value unchangeable
- **value** - default value, mainly use for the `readonly` attribute
- **as** - change the base element (default `input`, can be a React component)
- **parseTimeFormat** - for type `time` only, allowing you to parse and stringify time as milliseconds instead of a `Date`
- **props** - props for the `as` element

### BTextarea

Text-only input rendered as a `<textarea>` by default.

```astro
<label for="moreInfo">More information</label>
<BTextarea id="moreInfo" name="moreInfo" maxlength={400} required/>
```

It includes the following attributes:

- **minlength** - minimum text length
- **maxlength** - maximum text length
- **pattern** - regex pattern for text
- **required** - a value must be provided
- **readonly** - make the value unchangeable
- **as** - change the base element (default `textarea`, can be a React component)
- **props** - props for the `as` element

### BSelect

The select component lets the user choose one or more values.

```astro
<label for="favoriteFood">Favorite food</label>

<BSelect id="favoriteFood" name="favoriteFood" required={false}>
    <BOption disabled selected>Choose a food</BOption> <!-- The default, but not selectable -->
    <BOption>Pizza</BOption>
    <BOption>Salad</BOption>
    <BOption>Lasagna</BOption>
</BSelect>
```

- **type** - `text` / `date` / `number` - for parsing purposes
- **multiple** - select more than one value
- **required** - something must be selected (default `true`)
- **as** - change the base element (default `select`, can be a React component)
- **props** - props for the `as` element

#### BOption

The select option

- **value** - value to send to the server
- **disabled** - you cannot select this option

## Buttons
`BButton` is the general form control. You can also use it without `Bind` data.

```astro title="src/pages/basic-form-components.astro"
---
import { BButton, BindForm } from '@astro-utils/forms/forms.js';
import Layout from '../layouts/Layout.astro';

function sayHi(){
    console.log('Hi');
}
---
<Layout>
    <BindForm>
        <BButton onClick={sayHi}>Say hello</BButton>
    </BindForm>
</Layout>
```

Attributes:
- **onClick** - function to execute when the button is clicked
- **whenFormOK** - execute the function only if there isn't any error in the form
- **as** - change the base element (default `button`, can be a React component)
- **props** - props for the `as` element
- **state**: any - store state per button (must be used with `BindForm`)
- **extra**: any - store extra data per button (cannot be changed in the `onClick` function)

## Validation feedback

Show the form errors, so you can fix them and resubmit.

Most form validation is handled by the browser and repeated on the server. Add `errorMessage` when a field needs a clearer application-specific message.

```astro
<FormErrors title="Form errors"/>

<label for="number">Number</label>
<BInput id="number" type="int" min="1" name="number" errorMessage="Number must be at least 1"/>
```

Attributes:
- **title** - the error title

This will output the following if it got to the server validation:
```html title="HTML output"
<h4>Form errors</h4>
<ol>
    <li>Number must be at least 1</li>
</ol>
```
