---
title: Data binding
description: Forms data binding
---

## Simple example

You use components simpler to HTML5 standard form components.

Behind the seen, the form is <ins>validate</ins> and <ins>parsed</ins> according to the HTML

```astro
---
import { Bind, BindForm, BButton, BInput } from "@astro-utils/forms/forms.js";
import Layout from "../layouts/Layout.astro";

const form = Bind();
let showSubmitText: string;

function formSubmit(){
    showSubmitText = `You name is ${form.name}, you are ${form.age} years old. `;
}
---
<Layout>
    <BindForm bind={form}>
        {showSubmitText}

        <h4>What you name*</h4>
        <BInput type={'text'} name="name" maxlength={20} required/>

        <h4>Enter age*</h4>
        <BInput type={'int'} name="age" required/>

        <BButton onClick={formSubmit} whenFormOK>Submit</BButton>
    </BindForm>
</Layout>
```

## Custom errors & validations

Add your own validation to a form filed

```astro
---
const BAN_NAMES = ['Anders', 'Royale', 'Ada'];
const form = Bind();
let showSubmitText: string;

function formSubmit(){
    showSubmitText = `You name is ${form.name} `;
}

function userNameOK(value: string){
    if(BAN_NAMES.includes(value)){
        return {error: 'This is the admin names, you can not use them'}
    }
}
---
<Layout>
    <BindForm bind={form}>
        {showSubmitText}

        <FormErrors title="Errors"/>

        <h4>What you name*</h4>
        <BInput type={'text'} name="name" validate={userNameOK} maxlength={20} required/>

        <BButton onClick={formSubmit} whenFormOK>Submit</BButton>
    </BindForm>
</Layout>
```

## Bind

The bind function has the following signature

```ts
function Bind<T>(defaults: T): T & {errors: [], defaults(), [key: string]: any}
```

### Default values
Add default values to files that are not required
```astro
---
const form = Bind({name: 'Unknown'});
let showSubmitText: string;

function formSubmit(){
    showSubmitText = `You name is ${form.name}, you are ${form.age} years old. `;
}
---
<Layout>
    <BindForm bind={form}>
        {showSubmitText}

        <h4>What you name</h4>
        <BInput type={'text'} name="name"/>

        <h4>Enter age*</h4>
        <BInput type={'int'} name="age" min={10} required/>

        <BButton onClick={formSubmit} whenFormOK>Submit</BButton>
    </BindForm>
</Layout>
```
