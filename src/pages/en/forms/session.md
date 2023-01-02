---
title: Forms - session
description: Astro-Metro forms session
layout: ../../../layouts/MainLayout.astro
---

Astro-Metro form use session to save [CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF) validation secrets

Use can config, and use that session as you see fit
## Using

Use can get the session with the activation of web forms
```astro
---
import {Button} from '@astro-metro/forms/forms.js';
import {activateWebForms} from "@astro-metro/forms";
const {session} = await activateWebForms(Astro);

function increase(){
    session.counter ??= 0;
    session.counter++;
}
---
<Button onClick={increase}>++</Button>
<p>Current counter: {session.counter}</p>
```
### Endpoints & Session

You can use a session with endpoints as well, but with a little not
```ts
import { APIRoute } from "astro";
import { endpointSession } from '@astro-metro/forms';

export const get: APIRoute = endpointSession(({ params, request, session }) => {
  session.counter ??= 0;
  session.counter++;

  return {
    json: {
      message: session.counter
    }
  }
});
```
#### Note
Instead of using `EndpointOutput` 
```ts
{body: string, encoding: string}
```
Use the `Response` object or `APIResponseJSON`
```ts
{json: {[key: string]: any}}
```
These ways, we can send the session cookie back to the client

### Config

The default session use [memorystore](https://www.npmjs.com/package/memorystore).
You can see the full default configuration [here](https://github.com/astro-metro/metro-forms/blob/main/packages/forms/src/session/default-session.ts) 

The session function in the configuration needs to return express session object

At the project root - `forms.config.ts`
```ts
export function createSession(): RequestHandler {
    const memorySessionCreator = MemoryStore(expressSession);

    return expressSession({
        store: new memorySessionCreator({
            ...
        })
    });
}

export default {
    session: createSession
}
```