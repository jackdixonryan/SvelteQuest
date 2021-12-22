# Supabase and Authentication

Welcome back to SvelteQuest! It has been a while since last we convened. Now that the year is coming to the end and there’s a little spare time around the holiday season, I can finally get back to our project with a new article.

Last time, we implemented full CRUD functionality inside of a Svelte app and built Svelte API functions to examine SvelteKit’s RESTful API capabilities. In this installment, we will change directions a tad and set up methods so that users can authenticate with our application. 

To do this, we will be installing... our first dependency. For that, I’m sorry. 

---

## Why this Article Changed

I have worked with Firebase for three years, and been generally happy with the service. When I set out with SvelteQuest, I figured I’d reach for Firebase due to its familiarity. If I didn’t need to worry about establishing a base of knowledge with a new database/auth service, I could focus more on the SvelteKit itself. 

Firebase has, of late, made some of its drawbacks more apparent to me. Aside from some scaling pains (pains that could constitute an entire secondary article in their own right), my team and I have started to ogle the rigid structure of SQL databases with covetous eyes. 

But for years, I’ve strayed away from SQL databases, largely just because of my familiarity with noSQL. And in noSQL world, I’ve yet to find a package that gives me quite as many capabilities as Firebase does. However, I have started to appreciate the benefits that SQL imparts on an application. How many hours have I spent writing code to enforce fields and types on noSQL records (An act that, in a sense, deprives the noSQL database of *its central purpose)*? How often have I chased down bugs that turn out to be inconsistencies in the data structure?

In every adventure tale, there comes a time that a reluctant protagonist needs to do something entirely new. Well, perhaps not *entirely* new. Different, though. 

## What is Supabase?

Put simply, Supabase is an “open source Firebase alternative.” It offers:

- A database
- A user-management service
- File storage
- Auto-generated APIs (these are cool, and I encourage you to explore them).

More specifically, Supabase offers a platform where a developer can easily create and manage a Postgres (That’s right, SQL) database, manage a userbase, and add row-level security to SQL tables so users only have access to their own data.

To get started, visit the Supabase website and grab an account with them. If you have questions about Supabase’s flow, I encourage you to check out their Quickstart guides and read the introduction. Once you have an application, navigate into it and click into the sidebar icon marked `API`. This is the page we’ll be working with today.

As a disclaimer, I will note that Supabase is still in a public beta, which they declare is “stable enough for most non-enterprise use cases.” I have used this tool for a while now and I adore it; that being said, it might not *yet* be the right choice for larger, real-world applications.

If you have any questions about the scalability and production-readiness of Supabase, I encourage you to read their production-ready guide before deciding if Supabase if the right choice for your application. 

[Going into Prod Checklist | Supabase](https://supabase.com/docs/going-into-prod)

For our SvelteQuest, though, I think this is the perfect tool. Let’s get started. 

## Setting up for Authentication

At this point, I am going to assume that you have a Supabase account and are able to view your users, tables, storage, etc. Head to the API Docs section in the sidebar — there you will find the information we’ll be using to implement Svelte in our application.

The time has come to install our first dependency: 

```bash
npm install --save @supabase/supabase-js
```

Once Supabase is installed on your local application, navigate to the `src` directory. Add a new directory called `lib` inside the `src` directory. 

The `lib` folder is a general utility folder that contains TypeScript code which needs to be accessed from multiple places in the application. The code in the `lib` folder should also generally lack application-specific logic; that is, anything in the `lib` folder could theoretically be passed from one project to another. 

In `lib`, create a new file called `supabase.ts`. This is where we will declare and export our Supabase client. Import the `createClient` method from the Supabase package:

```tsx
import { createClient } from "@supabase/supabase-js"

const client = createClient(
   import.meta.env.VITE_SUPABASE_URL,
	 import meta.env.VITE_SUPABASE_ANON_KEY
);

export default client;
```

You need both a Supabase URL and a Supabase anonymous key to successfully configure the Supabase client on the frontend - these can be found in your personal API documentation on the Supabase website. While the URL is not sensitive and doesn’t need to be stored outside of source control, the anonymous key absolutely does. 

Supabase offers three types of keys, though there are only two you really need to worry about in the codebase. The three types are: 

1. The **client** key, which we are using here, loads the client on the frontend *before* the user has authenticated. Depending on your security rules, this might give an unauthenticated user some access to your resources, but not access to anything. 
2. The **user** key, a traditional token issued to a specific user for a particular session.
3. The **service** key. Unless you know what you’re doing, don’t use the service key for anything. It bypasses all security policies and gives full access to all the data in your system. This can be a really handy key for database administrators, but you absolutely don’t want it surfacing in your web app.

You will notice above the somewhat different pattern for environment variables - the `import.meta.env.VITE_` construction. Any variables that exist in you own `.env` file - as your Supabase anonymous key can - must be accessed like this.  Note that the variables **must** be prefixed with `VITE_` in both the `env` and at the reference site. 

If, like me, you are using TypeScript, you will also have to declare some custom types in `/src/global.d.ts` to use this pattern without receiving a type error.

```tsx
/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
```

All right, we have what we require to start writing our authentication calls. For now, let’s keep things simple and implement only three auth methods:

- Sign up with email and password
- Sign in with email and password
- Sign out.

We can dedicate another article to SSO integrations, as they seem to be becoming more and more popular around the web, but for today we’ll stay focused on some more basic auth. 

## The Sign Up Page

Navigate out of the `lib` directory and into the `routes` directory. There, create a new folder called `user`. Within, create two new Svelte files: `sign-in.svelte` and `sign-up.svelte` - again, the filesystem-based router will generate the pages `/user/sign-in` and `user/sign-up` based on the files we just created. 

Within `sign-up.svelte`, let’s focus on the script: 

```tsx
import { goto } from "$app/navigation";
import type { Session, User } from "@supabase/gotrue-js";
import supabase from "$lib/supabase";

const { auth } = supabase;

type NewUser = {
  user: User;
  session: Session;
  error: Error;
  data: User | Session;
}

let password: string;
let email: string;
let message: string;

async function signUp() {
  try {
    const user: NewUser = await auth.signUp({ email, password });
    if (user) {
      goto("/");
    }
  } catch(error) {
    message = error;
  }
}
```

That is *all* of the frontend-code we need to run this sign in form. Pretty cool, right? In the above code, we: 

1. Import `goto` for navigation and `supabase` from our `lib` folder, using the prebuilt SvelteKit alias `$lib` for easy access. 
2. Destructure the `auth` package from `supabase`. 
3. Declare a type `NewUser` to successfully type the result of the signup call. 
4. Declare three not-yet-defined string variables, `password`, `email`, and `message.`
5. Declare an asynchronous `signUp` function which takes no parameters.
    1. Invoke and `await` the results of the Supabase `signUp` function. This function takes one parameter, which in this case is a short-hand object with `email` and `password` properties.
6. If the sign up process succeeds, redirect the user to the homepage using the `goto` method.
7. If there is an error during the process, assign the error to the `message` variable.

The HTML of the form is equally simple: 

```html
<div id="sign-up-form">
  <h1>Sign Up</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signUp }>Sign Up</button>
  {#if message } 
    <p class="error-message"> { message } </p>
  { /if }
</div>
```

Four main things to observe include: 

1. The binding of the `email` variable to the email input. 
2. The binding of the `password` variable to the password input. 
3. The invocation of the `signUp` function on clicking the button.
4. The conditional rendering of the error message if one exists. 

Give it a shot! If everything worked, you should see a new row in your Authentication users table in the Supabase GUI, along with a date of last sign in and an autogenerated UID. 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6769d40f-2e9d-4f18-bcd3-0a4fc2167e9f/Untitled.png)

## Signing In

This section is fortunately blessedly brief. The code above for running registration can be repurposed perfectly for running authentication simply by changing which Supabase function we invoke: 

```tsx
import { goto } from "$app/navigation";
import type { UserCredentials } from "@supabase/gotrue-js";
import supabase from "$lib/supabase";

const { auth } = supabase;
let password: string;
let email: string;
let message: string;

async function signIn() {
  try {
    const user: UserCredentials = await auth.signIn({ email, password });
    if (user) {
      goto("/");
    }
  } catch(error) {
    message = error;
  }
}
```

Refactor the form to reflect that it is for Authentication:

```html
<div id="sign-in-form">
  <h1>Sign In</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signIn }>Sign In</button>
  {#if message } 
    <p class="error-message"> { message } </p>
  { /if }
</div>
```

And you’re done - aside from styling, of course. Clear your cache and try to re-authenticate with the credentials you used during signup - if everything works, you should be redirected to the homepage and see an update to the last sign in for your account in the Supabase GUI,

However, you might notice a problem - if you refresh your application, or close and reopen the tab, you’ll need to sign in again. Without something managing the application state, SvelteKit cannot remember the user when they refresh or close the application. For that, we need to use a Svelte store.

## Svelte Stores

In my experience, stores and state management can be one of the trickiest topics to understand in frontend web development. Fortunately for us, Svelte makes it blessedly simple. A `store` in Svelte is just an object that “allows reactive access to a value via a simple *store contract.*” 

While any variable that has this contract can be declared as a store and referenced as such, we’re going to stick with the prebuilt stores that `svelte/store` offers us. 

In the `src` directory, open up a new directory called `stores` and create a new file, `index.ts`. Within, write the following: 

```tsx
import { writable } from "svelte/store";

export const user = writable();
```

`writable` is a variety of store that can be set from outside components. Contrast this to a `readable` store, which cannot be set from the outside, and a `derived` store, which is... a store sourced from other stores. In this series, we’re mostly going to use `writable` stores. 

Now, navigate to the homepage - that is, `/routes/index.svelte`. Here, we’re going to create a simple binary view to evaluate whether the user is authenticated: 

```tsx
<script lang="ts">
  // import { user } from "../stores";
  import supabase from "$lib/supabase";

  user.set(supabase.auth.user());
  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session.user);
  });

</script>

{#if !$user}
  <h1>Welcome to SvelteQuest</h1>
  <h3>Start an Account</h3>
  <a href="/user/sign-up"><button>Here</button></a>
{:else}
  <h1>Welcome to an Authenticated Application!</h1>
{/if}
```

1. Import the writable store `user` .
2. Import `supabase`. 
3. Call the `set` function on the user store with `supabase.auth.user()` as the only parameter. 
4. Now, invoke the `onAuthStateChange` method to listen to the `session` - note that Supabase auth is automatically changing session variables to “remember” the user’s authenticated session - and reset the `user` whenever the auth state changes.

 So, log in events will register the state change and render the Authenticated HTML message, while log out events will revert to the no-auth copy.

However, in this style, we would have to re-write this method on every single page that that requires the user to be authenticated. This has advantages and drawbacks - one advantage might be that you only need to check the store when loading certain components rather than relying on a universal check. At the same time, it certainly makes the code less DRY. 

For my part, I actually enjoy needing to import the user store whenever I have a component in need of auth. From a security perspective, it makes it easier for programmers to remember when they need to expressly enforce authentication on a resource. Compare this to some middleware-type that make it far easier to forget if the user requires an auth session or not when writing component code. 

## Wrapping Up

Supabase makes it very simple and straightforward to implement authentication in your web application. Using a combination of Supabase functions and writable stores, you can easily manage users in your SvelteKit application. 

In the next installment, we’re going to migrate our simple user REST functions which modified a local array of characters so that they interact with a Supabase characters table instead. Then we’ll talk about implementing authorization using Security policies to mark characters as public or private. 

In the meantime, there’s no doubt that the application could use some sprucing up from a UX experience. My level of skill with CSS is... not very high. Rather than writing a full-fledged installment on styling guidelines that an experienced UX designer will immediately flag as foolhardy, my current plan is to dedicate a branch of the repository to styling and direct attention there in the next episode. Alternatively, you could simply style your version however you want - it is yours, after all.
