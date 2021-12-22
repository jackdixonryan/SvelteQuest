# CRUD Operations

Welcome back to SvelteQuest! In the last installment (link) we demonstrated how to run a single GET call to a Svelte endpoint, and how to use SSR to make our data-rich Svelte pages lightning fast. In this installment, we'll be rounding out our suite of capabilities so that our web application can be fully operational.

---

## CRUD Operations

Tons of the internet's functionality is covered with the simple read operation. The average internet user loads and peruses websites, pulling content from the server for the sole purpose of seeing it. This is where SSR spreads its wings and soars. 

Of course, the internet is also interactive. We're talking sending emails, deleting photos, modifying blog posts, etc. For these operations, SSR is not an option - the operations, at least conventionally, occur after user interaction.

Fortunately, SvelteKit makes it easy to add these sorts of routes. 

---

## POST: Create a New Character

In previous SvelteQuest installments, we've interacted with a boilerplate, hard-coded array called `characters`. Now, we finally get the opportunity to modify that array. First, let's create a `POST` request to add new characters to the characters array. To start:

1. Navigate to `/src/routes/characters`.
2. Create a new file, `characters.ts`. This file will export the `characters` array so that we can access it across different files and pages, rather than having it live in the `src/routes/characters/data.json.ts`, as it was. 

```tsx
export const characters = [
  {
    name: "almeira herrera",
    level: 12,
    created: new Date(),
    id: "1"
  },
  {
    name: "tripper trapper",
    level: 3,
    created: new Date("2021-07-03"),
    id: "2",
  },
  {
    name: "barry abalone",
    level: 23,
    created: new Date("2020-04-03"),
    id: "3"
  }
];
```

1. Open `src/routes/characters/data.json.ts`. Add a new method to this file: 

```tsx
export async function post({ body }) {
	
}
```

Just like the `get` route, adding an exported function `post` to the endpoint code will create a new `POST` operation for `/characters/data.json`. This endpoint file should already be exporting the `get` function from the previous article; adding a `POST` operation to the same endpoint is as easy as exporting the new function.

For the `POST` operation, we need to manipulate and validate the `body` of the request. In the past, we've seen the endpoint method called with the argument `{ params }`, which is a property destructured from the broader `request` object. The `body` property we need can also be destructured from the `request` object.

Based on the data already included in the `characters` array, we need to have four separate fields for a new character: `id`, `level`, `created`, and `name`. Of these fields, only one - the `name`- is determined by user input. Let's first build some *exceptionally* simple validators to make sure the character data we're receiving is correct: 

<aside>
⚠️ In the following code snippet, you'll see me use a simple string number as an ID system. Because this is an article about CRUD operations in SvelteKit applications, I did not wish to delve too deep into that topic, and I am trying to avoid from using extraneous dependencies. Using incremented IDs in production applications is always taboo - bad actors can use incremented ID systems to know exactly how resources are stored in an application and, with that knowledge, run operations to steal, modify, or delete user data. 

In true production builds, I highly recommend using UUID as an ID system.

</aside>

[uuid](https://www.npmjs.com/package/uuid)

```tsx
import { characters } from "./characters";
// the get function is here...

// assume that the JSON for a new character will appear as:
// {
//    "character": {
//				"name": "YOUR_CHAR_NAME"
//    }
// }
export async function post({ body }) {
	// destructure the character property out of request.body
  const { character } = body;
	// if there is no character property, send a 400 error
  if (!character) {
    return {
      status: 400,
      body: {
        error: "Request must include the `character` property."
      }
    }
  }

	// destructure the name property out of body.character
  const { name } = character;
	// return a 400 error if there is no property name
  if (!name) {
    return {
      status: 400,
      body: {
        error: "Character was missing required fields."
      }
    }
  }

	// set some of the default fields to their defaults
  character.level = 1;
  character.created = new Date();
	// Use a simple number string for a rudimentary ID system.
  character.id = (characters.length + 1).toString();

	characters.push(character);
	return {
    status: 201,
    body: {
      characters
    }
  }
}
```

To walk through the `post` method:

1. We try to destructure a property, `character`, from the request body argument. 
2. If there isn't a property by that name, we return a `400` error asking for that parameter. 
3. Then, we destructure the `character`object to find a property `name`. 
4. If `name` is not included, we send a `400` response asking for that parameter. 
5. If everything passes, we set default values for all of `character`'s other properties 
6.  We return a status of `201 resource created` along with a new newly-modified `characters` array.

With that, our `POST` endpoint is ready for requests. Now, we need a frontend page to support character creation.

### Creating Forms

Since characters must have a `name` property, and since users will undoubtedly want to come up with one themselves, we need a character creation form. To make one, create a new Svelte file in `/src/routes/characters` and name it `create.svelte`  (which will, of course, create a new webpage at `/characters/create`).

First, let's draft an input for the character name. We want this input to sync up with a variable in the `script`, called `name`. To do this, we must `bind` the variable to the value of an input HTML element: 

```html
<script>
let name = '';
</script>

<div id="character-creation-form">
  <input type="text" name="character-name" id="character-name" bind:value={name} />
  <button on:click={createCharacter}>Create New Character</button>
</div>
```

We declare a variable, `name`, in the `script` element. In the markup, there is an element `input` with some Svelte code to bind the `name` variable to the value of the input - `bind:value={name}`. "Binding" essentially means that the value of this input and the value of the variable `name` are inextricable from one another; a change to the value of one will change the value of the other. 

We also added a button in the markup which has a click event listener on it - `on:click={createCharacter}`. This tells Svelte to run the `createCharacter` function when the button is clicked. Within this function, we will include a fetch request to POST a new character to the endpoint we created:  

```tsx
async function createCharacter(): Promise<void> {
	const character = { name };
  const response = await fetch("/characters/data.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ character })
  });

  if (response.status === 201) {
    // this is  how we know the request succeeded. 
    location.replace('/characters');
  } else {
		alert("There was a problem creating the character!");
	}
}
```

This fetch call is more complex than the simple `get` call. We need to specify a couple more properties in the fetch calls options:

1. `method`: fetch defaults to `GET`, but in this case, we want `POST`. 
2. `headers`: The endpoint is designed to handle JSON, and so, we must specify that our request's payload is JSON. 
3. `body`: With the character object as a parameter of the post body, we stringify the data we're going to send so that the endpoint can correctly receive it. 

If the call succeeds, we can redirect the user to the character index page, where they should be able to see their new character in the lineup. If the call fails for some reason, a simple `alert` will do the trick for right now. 

Altogether, this Svelte component looks like this: 

```html
<script lang="ts">
  $: name = '';
  $: {
    console.log(`Name is now ${name}.`);
  }
  async function createCharacter(): Promise<void> {
    const character = { name };
    const response = await fetch("/characters/data.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character })
    });

    if (response.status === 201) {
      // this is  how we know the request succeeded. 
      location.replace('/characters');
    } else {
      alert("There was a problem creating the user!");
    }
  }
</script>

<div id="character-creation-form">
  <input type="text" name="character-name" id="character-name" bind:value={name} />
  <button on:click={createCharacter}>Create New Character</button>
</div>
```

To test out the new form, launch the application (`npm run dev`) and navigate to `http://localhost:3000/characters/create`. Type in a character name in the input and click the **Create New Character** button. If you are redirected to the Characters page with your new character in the array, then the `POST` character endpoint is working!

---

## Update a Character

Our characters are dynamic, mutable objects that users will definitely want to modify. We therefore need to offer update capability.

First and foremost, we will need a new Svelte page. We could theoretically update the characters directly from the list characters page, but customarily updates to a single record should occur on a dedicated page. 

The character we just created has an `id` of `4`, so we can host the character's details at the endpoint `/characters/4`.  To do this, we need to use **request parameters.** SvelteKit needs to interpret the property `4` as a dynamic parameter, so we "declare" it in the filesystem-based router. 

Create two new files in `/src/routes/characters` called `[id].svelte` and `[id].json.ts`. These will create the endpoint and page for `/characters/:id`. By surrounding the name of the dynamic property - `id` - in brackets, we tell SvelteKit to interpret the value as a parameter instead of a static part of the URL string.

On this page, we should probably have some `GET` functionality to show us the character's details. Since I've covered `GET` calls and SSR in previous articles, I will skip the code for fetching the character. Visit the Github repository to view the entire source code. 

For our update call, let's use the most exciting update a TTRPG player can have - leveling up. Within `[id].json.ts`, export a new function `patch`. The `PATCH` operation is what we will use for updating data. 

```tsx
export async function patch(request) {
  const { body, params } = request;
  const { id } = params;
  const { level } = body;

  if (!id || !level) {
    return {
      status: 400
    }
  }
  
  const character = characters.find((c) => c.id === id);
  if (!character) {
    return {
      status: 404
    }
  }

  character.level = level;
  return {
    status: 201,
    character
  }
}
```

1. Declare the function `patch` with the entire `request` as a parameter.
2. Destructure `body` and `params` from the request. 
3. Destructure `id` from the `params`. Because `id` was implicitly declared as a property of `params` by including it in the filesystem-based router, it is available on all of the methods in this file. 
4. Destructure a `level` property from the body. 
5. If `id` or `level` are nullish, return a 400 error. 
6. Otherwise, look for the character with an ID of `id` in the characters array (if you have not done so, you will need to import the characters array). 
7. If the character of ID `id` cannot be found, send a 404 error. 
8. Otherwise, set the character's `level` to the new level. 
9. Return the character and a status of `200 OK`. 

Back on the Front end, open `[id].svelte`. I've added some boilerplate to load basic character details onto the page, along with a button - `Level Up!` - that invokes a function called `levelUp`.

In the `script` tag, declare a new function called levelUp:

```tsx
async function levelUp(): Promise<void> {
    character.level++;
    const response = await fetch(`/characters/${character.id}.json`, {
      method: 'PATCH', 
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ level: character.level })      
    });
  }
```

1. Increment `character.level` by `1`.  
2. Invoke the fetch API. 
3. Instead of the default `GET` method, use `PATCH`.
4. Set the content type to `application.json.`
5. Stringify a JSON `body` with the `level` property set to the newly-incremented level. 

Now load the page and click the Level Up button - you should see the level of your character on the page update, and if you navigate to the character index, the new level will display there as well. 

---

## Deleting a Character

Sometimes a player's character may die. For these tragic moments, we need `DELETE` as an option for this collection. We've already created `[id].json.ts`, so all we need to do is add a new function to it: 

```tsx
export async function del({ params }) {
  const { id } = params;
  const character = characters.find((c) => c.id === id);
  if (!character) {
    return {
      status: 404
    }
  }
  
  const characterIndex = characters.findIndex((c) => c.id === id);
  characters.splice(characterIndex, 1);
  return {
    status: 200,
    body: {
      character
    }
  }
}
```

1. Declare a new function, `del`. Note that this function alone does not have the exact same name as the HTTP operation it provides, since `delete` is a reserved keyword in JavaScript. 
2. Pass the destructured `params` property into the `del` function's arguments. 
3. Destructure the `id` from the `params`. 
4. Find the appropriate character. If the character cannot be found, return a `404` error code. 
5. Otherwise, get the index of the character marked for deletion. 
6. Splice the characters array at the character's index to delete that character from the array. 
7. Return a `200 OK` to mark the operation as successful. 

On the frontend, add another button that invokes a function called `deleteCharacter`:

```tsx
async function deleteCharacter(): Promise<void> {
    const sure = confirm("Do you really want to?");
    if (sure) {
      const response = await fetch(`/characters/${character.id}.json`, {
        method: 'DELETE'
      });
      
      // redirect from the page if successful because this page will break.
      if (response.ok) {
        location.replace('/characters');
      }
    }
  }
```

1. For sanity's sake, we can add a quick and ugly `confirm` block to ensure the user wants to proceed with a permanent delete. 
2. Use `fetch` with a method of `DELETE`.  No JSON body or request headers are required for this call. 
3. If the endpoint returns a `2XX` response, the call was successful. Since this particular page is defunct once its corresponding character is deleted, redirect to the list of characters.

When you test this in your browser, you should see that the character is removed from the character list after deleting them. RIP, you poor, misbegotten soul. 

 

---

## Wrapping Up

That was a much longer article than usual, but with much sweat and mental toil, we've covered all the REST functionality we'll need from our SvelteKit application. Pretty cool, right? Every single other operation we need to perform, on any other data we might offer, will invariably use the exact same techniques and methods we just covered. 

On the next installment of SvelteQuest, we'll be jumping into the nitty gritty of a totally different part of our application - user authentication and authorization. Join us there as we start building what we need to get users on our app!
