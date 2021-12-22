# Getting Started

> The next few articles are going to be very heavy on Svelte. While you won't need to know anything about Svelte to get started in this tutorial, I highly recommend you refer to [Svelte](https://svelte.dev/docs) and [SvelteKit](https://kit.svelte.dev/doc) documentation as sources of truth over this article. This caution is especially pertinent because SvelteKit is still in a public beta at the time of my writing, and it may change faster than I can keep SvelteQuest updated.
> 

[Previous: SvelteQuest: Introduction](https://medium.com/@jack.dixon.ryan/sveltequest-an-introduction-a9260e44b693)

Welcome back! In this article, we're going to get set up with SvelteKit and do some preliminary stuff. This will include: 

1. Downloading, installing, configuring the application. 
2. Exploring the application's filesystem. 
3. Creating a basic page. 

---

## The Repository

This article series corresponds with the [SvelteQuest repository.](https://github.com/jackdixonryan/SvelteQuest) Different articles correspond with different branches. For this article, the branch is `1-skeleton-code`. The branch reflects the codebase at the *conclusion of the article.*

---

## Getting the Application Set up with SvelteKit

Let's jump right in! I will be following the SvelteKit documentation for setting up by using NPM to create and run the application. First, in the directory where you want this project to live, run:

```bash
npm init svelte@next ttrpg-application
```

This command creates a new folder, `ttrpg-application` (or whatever you wish to name it), in your current directory. This is where the source code for the project will live. The command will require you make a couple of early configuration choices:

1. Choose `Skeleton Project` as your app template. 
2. Use TypeScript: `Yes`. You may use JavaScript if you wish, it will not bar you from following this series. I, however, will be using TypeScript.
3. Add ESLint, Add Prettier: `Yes`. Not necessary, but the headaches these will cause can save you from greater beasts in the long run.

That's all SvelteKit needs to scaffold the application! **Do not run `npm install` yet.** Once the command is finished running, navigate into the project directory:

```bash
cd ttrpg-application
# Open it up with your preferred editor
```

First things first: open up the `package.json` and update the name of your repository. Additionally, (if they have not fixed this bug), manually update the Svelte developer dependency to `30.40.1`, otherwise the application will throw errors when you attempt to launch it. With that updated, run the installation:

```bash
npm install
```

While that's installing, marvel at the fact that *every dependency in the SvelteKit boilerplate is a developer dependency.* That means that the Svelte framework is going to help us, the developers, pre-compilation; However, after we compile, build, and ship the application, it will have *no framework dependency*. SvelteKit is going to compile the whole damn application into performant vanilla JavaScript. 

That means that the users get a compact version of the application which will load faster, run faster, eat up less memory, eat up less processing power, and load on more devices and internet connections. Sweet!

## Looking around

---

Once the install command exits successfully, start the development application:

```bash
npm run dev
```

This will launch the skeleton application on `http://localhost:3000`. Navigate to that address in your preferred browser and you should see some Svelte boilerplate. Excellent, but how exactly does the page exist?

The initialization command generated a filesystem. This filesystem is critical to the way SvelteKit runs. Focus on the `src` directory, since that's where most of the code we're going to write will live.

Within `src` there's a special directory called `routes`. SvelteKit uses the contents of the `routes` folder to generate pages, a process called filesystem-based routing. As we create and name files and directories in the routes directory, SvelteKit will work some magic to generate the corresponding pages in our application. For example, 

- If I create a file, `about.svelte`, I will generate the `/about` page, eg, `http://localhost:3000/about`.
- If I create a file, `about.json.ts`, I will generate the `/about.json` endpoint in the server-side code of the application.
- If I create a new directory, `users`, and place a file within it, `index.svelte`, I will generate the page `/users`. If I add another file, `[userId].svelte`, I will generate the page `/users/:userId`, as SvelteKit interprets bracketed names as route parameters.

We're going to be doing almost all of our work in the routes directory, so it's very important to remember how the filesystem-generated routing will function. 

## Creating a Page

---

Inside the `routes` directory, create a new file: `about.svelte`. This will generate a new page in the web application, but until we write something, the page will be empty. 

Svelte boilerplate is, thankfully, *identical to regular old HTML.* That's right, no elaborate object system to remember, no weird new syntax or structure, just a little boilerplate and we'll be off to the races. Try adding this boilerplate to `about.svelte`:

```html
<script>
  const myName = "YOUR_NAME";
</script>

<style>
  .name {
    color: red;
  }
</style>

<h1 class="name">Hello, {myName}!</h1>
```

Navigate to `[http://localhost:3000/about](http://localhost:3000/about)` and you'll see a nice little red message, just for you! Breaking down the boilerplate, you can see that what we've just written has a dead-simple structure:

1. A `script` tag, where the JavaScript lives.
2. A `style` tag, where the CSS lives.
3. A bunch of `HTML`, as much of it as you want! No wrapping tag is required for this one.

The only unfamiliar bit might be the curly-bracketed reference to the variable `myName`. The variable `myName` is declared in the `script`, but easily accessed in the template. All we need to do to reference values from our code is wrap them in curly cues, and we can load them to the DOM. Pretty nifty. 

And, well, that's that! We're set up and we've got all the basics we need to get to work. Please leave a comment if you got stuck at any point during the process, I'll be more than glad to see if I can help out. Next time, we'll be learning how to create a server endpoint in SvelteKit, and harness that newfound power to mock a basic API request.
