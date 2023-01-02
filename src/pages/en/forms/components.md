---
title: Forms - components
description: Astro-Metro forms components
layout: ../../../layouts/MainLayout.astro
---

## Form Input
### Input

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

```astro
<Input type="date" name="meetingDate" min="2023-2-2" max"2023-4-2" required/>
```

### Textarea

Simple to input, but only for text

It includes the following attributes:

- **minlength** - minimum text length for text filed
- **maxlength** - minimum text length for text filed
- **pattern** - regex pattern for text
- **required** - a value must be send
- **readonly** - make the value unchangeable

```astro
<Textarea name="moreInfo" maxlength={400} required/>
```

### Select

The select component is use to make the user choose value / values

- **type** - `text` / `date` / `number` - for parsing purposes
- **multiple** - to select more then one value
- **required** - something must be selected (default `true`)

#### Option

The select option

- **value** - value to send to the server
- **disabled** - you can not select this option

```astro
<Select name="favoriteFood" required={false}>
    <Option disabled selected>Idk</Option> <--! The default, but not selectable-->
    <Option>Pizaa</Option>
    <Option>Salad</Option>
    <Option>Lasagna</Option>
</Select>
```

## Form controls
`Button` is the general form control. You can also use it without `BindForm` component
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
<Button onClick={sayHi}>Say Hi</Button>

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
<Input type='int' min="1" name='number' errorMessage="Number is smaller then 1"/>
```

This will output the following:
```html
<h4>From Errors</h4>
<ol>
    <li>Number is smaller then 1</li>
</ol>
```