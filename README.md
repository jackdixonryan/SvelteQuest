# API Operations in SvelteKit

Welcome back to SvelteQuest! [In the last installment](https://medium.com/@jack.dixon.ryan/sveltequest-ii-setting-up-3d48f7fbd7bb), we got everything configured and wrote the first basic Svelte page. Today we'll be changing gears an iota to talk about the other file in our filesystem-based router: The endpoint.

As with all quests, SvelteQuest starts simple, and by the end of the campaign we'll be able to kill the old gods or something. However, for today the objective is simple: 

- Send some JSON to the Svelte page via API
- Iterate through the JSON and display it on the page.

---

## Building the Endpoint

What I am calling an endpoint is, in fact, just a TypeScript module. 

In `/src/routes`, add a new directory, `characters`, and add a new file to the new directory, `data.json.ts`. TypeScript files in the filesystem-generated router correspond with endpoints in our web application which will receive calls and respond with data (preferably JSON, in my case). For the file we just added, the generated endpoint will be `http://localhost:3000/characters/data.json`. 

> It is important that we don't name the endpoint file and the page file the same thing. They will conflict with one another.
> 

SvelteKit has some very specific conventions for endpoints. While (powerfully) you can import anything you want from other TypeScript modules in your library, you can only export a set of rigidly defined functions that SvelteKit's build process will interpret. These functions correspond with HTTP operations, principally (for our use-cases) `GET`, `POST`, `PATCH`, `PUT`, and `DEL`.

```tsx
// /src/characters/data.json.ts

const characters = [
  {
    name: "almeira herrera",
    level: 12,
    created: new Date()
  },
  {
    name: "tripper trapper",
    level: 3,
    created: new Date("2021-07-03")
  },
  {
    name: "barry abalone",
    level: 23,
    created: new Date("2020-04-03")
  }
];

export async function get({ params }) {
  const { } = params;

  return { 
    body: {
      characters
    }
  }
}
```

Above is a very basic example of an endpoint. Let's break it down:

1. It declares a global array called `characters` and assigns it some boilerplate character objects.
2. It declares and exports a function named `get` which takes a single argument, `{ params }`. `{ params }` is a property destructured from the `request` object.
3. The `get` function returns an object with a property `body`. This property corresponds to the response data we receive when we make our call from the frontend to fetch this resource.

Expect this file to generate an endpoint at `/characters/data.json`. This endpoint can receive a `GET` request and responds with the `characters` array. 

---

## Building the Page

Last time, we put together a Svelte page called `about`. Today, create a new file in the `characters` folder of your filesystem-based router called `index.svelte`.  This will create the page `/characters` in the web application. 

Now, to consume the endpoint we just created. We can do so by way of the `fetch` API, which is included in SvelteKit by default. If you are unfamiliar with how fetch works, [please read the "Using Fetch" documentation.](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

```html
<!-- /src/characters/index.svelte -->

<script lang="ts">
let characters: any[];
async function get(): Promise<void> {
  const response = await fetch("/characters/data.json");
  const data = await response.json();
  characters = data.characters;
}
</script>
```

- Declare a top-level array, `characters`.
- Declare a single method, `get`, which takes no arguments.
- Within the scope of `get`, invoke the `fetch` method and await the response, then the data.
- Assign the value of `data.characters` to the top-level `characters` variable.

Now to invoke the `get` function. For this, we can use the lifecycle hook `onMount`, a native Svelte function that will run when the component is mounted to the page. 

```tsx
// /src/characters/index.svelte -- <script lang="ts"> tag contents

import { onMount } from "svelte";
let characters: any[];

async function get(): Promise<void> {
  const response = await fetch("/characters/data.json");
  const data = await response.json();
  characters = data.characters;
}

onMount(async () => {
  const response = await get();
	console.log(characters)
});
```

Slip a temporary log into the `onMount` method. Run `npm run dev` and navigate to `[http://localhost:3000/characters](http://localhost:3000/characters)` within the browser, open the console, and behold the glory that is a hastily hard-coded character array! 

Now to get these characters onto the page, otherwise they're completely useless. This step requires no further TypeScript and can be done entirely in the Svelte page's HTML:

```html
<!-- /src/characters/index.svelte -->

<h1>Character List</h1>
<ul>
  {#each characters as character}
    <div class="character-tile">
      <h3>{character.name}</h3>
      <p><strong>Level:</strong> {character.level}</p>
      <p><strong>Created On:</strong> {character.created}</p>
    </div>
  {/each}
</ul>
```

Since `characters` is an array, it cannot simply be dumped onto the page. We need an iterator to successfully and succinctly display this data. In Svelte's case, iteration is managed by an each loop. 

Broadly speaking, anything putting "logic" into the HTML - that is, operations usually done with JavaScript - is denoted by an opening tag (formatted `{# ...}`) and a closing tag (formatted `{/ ...}`. In this case: 

1. Open up an iterator with the `{#each}` tag. This requires two arguments:  A reference to the array desired for iteration - `characters`, and a declared variable for what to call the current item of iteration - `character`. Altogether, this constitutes the statement `{#each characters as character}`.
2. As with any kind of code, one must always remember to close their iterators, lest they burn laptops to the ground. In this case, the iterator ceases at the `{/each}` tag.

Add a little CSS just to make the page a little more mentally organized, and this newly data-rich Svelte component is: 

```html
<!-- /src/characters/index.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import type { Character } from "../../types";
  // here, we've got our JavaScript. It's held in the traditional script tag from HTMl. This should all be quite familiar. From here, we're going to make all of our calls and operations.
  
  // here, I'm going to set all of the reactive variables that we 
  // will be using the help this page function.
  let characters: Character[] = [];

  // let's lay our our functions for remote operation.
  async function get(): Promise<void> {
    const response = await fetch("/characters/data.json");
    const data = await response.json();
    characters = data.characters;
  }

  // here's our first lifecycle hook! The onMount function schedules a callback to run as soon as the component has been mounted on the DOM.
  onMount(async () => {
    const response = await get();
  });
  // don't do this bit...
  // (async function start() {
  //   await get();
  // })();
</script>

<style>
  .character-tile {
    width: 10rem;
    height: 10rem;
    border: 1px black solid;
    padding: 1rem;
    margin: 1rem;
  }
</style>

<h1>Character List</h1>
<!-- Now we can run an each loop to display the data. -->
<ul>
  {#each characters as character}
    <div class="character-tile">
      <h3>{character.name}</h3>
      <p><strong>Level:</strong> {character.level}</p>
      <p><strong>Created On:</strong> {character.created}</p>
    </div>
  {/each}
</ul>
```

Load up the page in the browser again, and there are three characters in three distinct divs, just *waiting* to be interacted with. Excellent work!

---

### Preloading

The above example is a perfectly valid way to load API data in Svelte, Sometimes it's the only way: Occasional use-cases will require API calls to await the mounting stage before the right parameters exist to call appropriate data. Yet, though the lag may seem unnoticeable, this slower than the alternative: Server-Side Rendering.

Svelte files can, like any HTML, have multiple script tags. One additional feature of SvelteKit is the `context` attribute, which tells SvelteKit how to interpret the code within a `<script>` tag.

SvelteKit allows us to leverage the ungodly power of SSR, Server-Side Rendering, by creating Svelte scripts with the `context="module"` attribute: 

```html
<!-- /src/characters/index.svelte -->

<script lang="ts" context="module">

  export async function load({ fetch }) {
    const url = `/characters/data.json`;
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();
      return {
        props: {
          characters: data.characters,
        }
      }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    }
  }
</script>
```

Within the `module` script, a single function is exported, called `load`. This function is required for the module script to work. The `fetch` API is loaded as a parameter (among others, more on that later) and invoked in the same way as the earlier example. 

The `load` function returns an object with a property, `props`, that contains custom properties which can be whatever we would like them to be. In this case, `characters`.

Now, we open up a second pair of script tags with a single line of code:

```html
<!-- /src/characters/index.svelte -->

<script lang="ts">
  export let characters: any[];
</script>
```

This `export` statement is a Svelte **property**. Writing it this way allows us to access the value of `props.characters`, which was returned from the module's `load` function. Now, the Svelte component looks like: 

```html
<!-- /src/characters/index.svelte -->

<script lang="ts" context="module">

  export async function load({ fetch }) {
    const url = `/characters/data.json`;
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();
      return {
        props: {
          characters: data.characters,
        }
      }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    }
  }
</script>

<script lang="ts">
  export let characters: any[];
</script>

<style>
  .character-tile {
    width: 10rem;
    height: 10rem;
    border: 1px black solid;
    padding: 1rem;
    margin: 1rem;
  }
</style>

<h1>Character List</h1>
<!-- Now we can run an each loop to display the data. -->
<ul>
  {#each characters as character}
    <div class="character-tile">
      <h3>{character.name}</h3>
      <p><strong>Level:</strong> {character.level}</p>
      <p><strong>Created On:</strong> {character.created}</p>
    </div>
  {/each}
</ul>
```

Not that much had to change, but now the page loads at lightning speed! This is the coolest way to load a SvelteKit page because it feels damn near instantaneous - granted, we're not working with a huge dataset. In the long run, using SSR will result in a much faster, more performant application that waiting for `onMount` hooks. 

On the next installment of SvelteQuest, we'll journey into the world of CRUD and modify our application to access the full panoply of HTTP methods and give our users **the** complete web experience. Excellent work, and I'll catch you next time!
