---
title: Forms - Components
description: HTML like form for Astro
---

## Form Input
### BInput

The basic component for most of the form filed.

It includes the following attributes:

- **type** - HTML input types: `text`, `checkbox`, `date`, `email`, `number`, `radio`, `file`... / `int`
- **min** - number / date
- **max** - number / date
- **minlength** - minimum text length for text filed
- **maxlength** - minimum text length for text filed
- **pattern** - regex pattern for text
- **multiple** - for files
- **required** - a value must be send
- **readonly** - make the value unchangeable
- **value** - default value, mainly use for the `readonly` attribute
- **as** - change the base element (default `input`, can be a React component)
- **props** - props for the `as` element

```astro
<BInput type="date" name="meetingDate" min="2023-2-2" max"2023-4-2" required/>
```

### BTextarea

Simple to input, but only for text

It includes the following attributes:

- **minlength** - minimum text length for text filed
- **maxlength** - minimum text length for text filed
- **pattern** - regex pattern for text
- **required** - a value must be send
- **readonly** - make the value unchangeable
- **as** - change the base element (default `textarea`, can be a React component)
- **props** - props for the `as` element

```astro
<BTextarea name="moreInfo" maxlength={400} required/>
```

### BSelect

The select component is use to make the user choose value / values

- **type** - `text` / `date` / `number` - for parsing purposes
- **multiple** - to select more then one value
- **required** - something must be selected (default `true`)
- **as** - change the base element (default `select`, can be a React component)
- **props** - props for the `as` element

#### BOption

The select option

- **value** - value to send to the server
- **disabled** - you can not select this option

```astro
<BSelect name="favoriteFood" required={false}>
    <BOption disabled selected>Idk</BOption> <--! The default, but not selectable-->
    <BOption>Pizaa</BOption>
    <BOption>Salad</BOption>
    <BOption>Lasagna</BOption>
</BSelect>
```

## Form controls
`BButton` is the general form control. You can also use it without `BindForm` component
Attributes:
- **onClick** - function to execute when the button clicked
- **connectId** - (optional) name for the button action (auto-generate by default)
- **whenFormOK** - execute the function only if there isn't any error in the form

```astro
---
function sayHi(){
    console.log('Hi');
}
---
<BButton onClick={sayHi}>Say Hi</BButton>

```
### Note
If you want the the button click will effect on JSX that appears before the button, it must be inside a `BindForm`

## Form Error

Show the form errors, so you can fix them and resubmit.

Most of the form validation are handle by the browser, but you can add custom error message if the browser does not support this type of validation.

Attributes:
- **title** - the error title

```astro
<FormErrors title="From Errors"/>
<BInput type='int' min="1" name='number' errorMessage="Number is smaller then 1"/>
```

This will output the following:
```html
<h4>From Errors</h4>
<ol>
    <li>Number is smaller then 1</li>
</ol>
```
