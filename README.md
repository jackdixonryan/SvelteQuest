# SvelteQuest 

## About this Repository
SvelteQuest is a repository that corresponds to the article series SvelteQuest. [You can find part I of the series on Medium](https://medium.com/@jack.dixon.ryan/sveltequest-an-introduction-a9260e44b693) or read it below in the section marked `Introduction`. SvelteQuest's purpose is to construct a TTRPG application from scratch using a minimal number of packages, such that the application can be run on mobile devices with low internet capabilities. 

Each branch of this repository corresponds to a particular article in the series. Half branches (like 4.5) do not necessarily have a corresponding article, but offer some context in their READMEs. Each branch's README contains its respective article. The code stored on each branch corresponds to the state of the codebase at the _conclusion_ of the article. 

This `main` branch will always contain the most up-to-date version of the codebase. 

## Steps for Setup
To run SvelteQuest locally: 

1. `git clone https://github.com/jackdixonryan/SvelteQuest.git`
2. `cd SvelteQuest` 
3. npm install --save
4. npm run dev

Pretty straightforward. 

# The Introduction

Little bit on my background before we begin: I have been a web developer for three years and CTO of FinGoal for two of them. I have worked extensively with Vue 2 on the Frontend, and with JavaScript and TypeScript Backends, largely built with Express. 

I recently finished a six-month long stint as a DM (Dungeon Master) for a group of vaguely intrepid pseudo-functional adventurers, and in that time I got a lot of experience (it was COVID, after all), with the kind of tooling and tech that's available to TTRPG players and GMs (Game Masters, the more generic term) online. 

---

## The Problem

My introduction to Svelte was [a talk by Rich Harris (Svelte's creator)](https://www.youtube.com/watch?v=AdNJ3fydeao) of the New York Times, which I would recommend watching in its entirety. To capture one of Harris's main points: 

> There's only one reliable way to speed up your code, and that is to get rid of it. Be like Marie Kondo: Does this JavaScript spark joy?
> 

I love frameworks. They make web development a lot easier for developers than it used to be. However, there's a general acceptance in the JavaScript community, and in the programming community at large, that JavaScript web applications are becoming large and resource intensive. Which is to say, they execute too much code.

An older iteration of me might have argued that the size and performance of an application across web frameworks is largely an academic debate, waged in kilobytes and nanoseconds that users will never witness. The old me didn't realize that I was a member of the internet-privileged. 

I am not an anomalous sort of programmer. I build away, scaffolding websites while listening to music and running four chat applications in the background of my 2020 Macbook Pro, blissfully unaware of the 649.5 Mbps download and 39.3 Mbps upload speeds of my home internet thrumming in the background. As I construct my application, I know nothing of how it loads on the average 10 Mbps download speed, let alone (Ye Gods, what have I wrought) the 7 Mbps download speed of phones connected only to 4g.

And, to go a step further, that 4g connection is *pretty amazing* in the broad scheme of thing. The following map will serve as an ample proof: 

![Download speeds by country, 2017. [Image belongs to u/sadnessrepellingbird](https://www.reddit.com/r/MapPorn/comments/8nc170/average_internet_speeds_2017_6460x3590_oc/)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f55196a7-c6a3-4c71-a1db-a1504cb81174/Untitled.png)

Download speeds by country, 2017. [Image belongs to u/sadnessrepellingbird](https://www.reddit.com/r/MapPorn/comments/8nc170/average_internet_speeds_2017_6460x3590_oc/)

What I, and developers like me, run the risk of making our applications inaccessible to *most of the world.* We build for metropoles, trodden ground, and easy-to-reach places. In short, we build web applications for use by people who are essentially in our demographic. That's a fairly tremendous oversight from the development community: It's supposed to be the world-wide-web, and yet we're barely scraping the surface. 

Now, obviously some of this is hardware. You've got to lay the cable and distribute the devices to get internet to new places. But software plays its role as well: The size and performance of an application are really big deals when internet is sparse. Having an extremely performant application means that it has a better chance of running over a weaker connection. That means more people, in more places, in different walks of life, can use the application. I think, from an ethical perspective, that should be a top priority in software development.

Then there's the other ethical priority: Energy consumption. It's no secret that humans use too much energy, and we're harming our planet to do so. [While the web's overall energy footprint (barring crypto mining operations, which are inefficient by *design*) is surprisingly low,](https://www.nytimes.com/2021/06/24/technology/computer-energy-use-study.html) I still believe that in a world where internet adoption and functionality is only going to rise, developers have a responsibility to keep their applications as lean as possible (to offer a carrot, it's also cheaper...). 

---

## Why Svelte?

[If you take a look at these tables from Log Rocket,](https://blog.logrocket.com/should-you-use-svelte-in-production/) you can see Svelte has a clear edge over the industry's other leading frameworks (Angular, React, and Vue) in the efficiency sphere. To synthesize the tables: 

- Svelte's total Kilobyte weight is the smallest smallest.
- Svelte is consistently interactive (a kind of time-to-interactivity metric) in fewer than 2 seconds, a feat the other frameworks fail to achieve.
- In every memory-related test (ready memory, run memory, memory usage after artillery-style data operations) Svelte shines.

If solving the problems I enumerated above is a top priority, these metrics would make a decision other than Svelte entirely unjustifiable. Now, I love Vue and it'll always have a special place in my heart (any framework that supplants jQuery will have that effect on a developer), but for this particular series, I'll to eschew the Vue because I've felt the Svelte (I thought about deleting this; I am not going to). 

---

## The Project

(For the uninitiated, I'm going to talk extensively about DND in this section. If you're just interested in the Svelte web stuff, I recommend waiting for the next article. If you're curious about this stuff, however, I'm going to start using some Tabletop Role Playing Game jargon, and I apologize. If you're fully initiated, I'm going to gripe about DND a little bit. I apologize for that as well). 

During the depths of COVID, my friends and I started leveraging some of the awesome existing tools to play Dungeons and Dragons remotely, and we had a great time. Even though we play in person now, the majority of us prefer the web tools like online character sheets (easier to manage) and virtual tabletops (cheaper) to their tangible analogues. 

As our in-person games are enriched by web tech, I've started wondering what I could build to contribute to our party's enjoyment. My first thought (while up late on a Saturday night doing campaign legwork for the next day's session, a common enough occurrence for a DM) was a world-building wiki to eliminate or streamline a lot of the tedium that comes with running rich, home-brewed games. However, I can now happily say that I'm using the beta of a fantastic world-building wiki called Legendkeeper, which I simply cannot praise enough.

[LegendKeeper](https://www.legendkeeper.com/)

So, what else could I build? DND tooling is pretty robust. Virtual tabletops are also in good hands. So, what about broader TTRPG tooling? As much as my friends and I love DND, we do have some party-specific complaints about it. Principally, we don't love the combat in DND, which we think tends to drag on or be uninteresting, since it's someone else's turn the majority of the time. 

Ever since we've started playing, I've been curious about what it takes to build a TTRPG from scratch. Obviously, that gets complicated. TTRPGs need all kinds of non-tech work to see the light of day. You need someone with a great brain for probability and statistics to work out how the game must be balanced. You need excellent copywriters to build the world, craft monsters and items, and succinctly summarize and present a large set of rules (Even so, there are entire forums dedicated to properly interpreting the holy gospels that are the DND core rulebooks). And you need play testers to trial the game again and again until the difficulty is balanced out - not to mention, to work out if what you've put together is actually any fun.

Now, we intend to do all of that stuff, but that's a subject for another article series. This article series is supposedly about Svelte development, so I've got to find some way I can use my web knowledge to help develop our TTRPG. So, I'll prioritize. What's the first thing everyone wants to do when they start a new TTRPG?

Why, roll a character, of course! Modern webpages are kind of the perfect medium for complex character sheets, and character sheets are actually a pretty good way to showcase everything that a modern web application has to do efficiently. Our character sheet must: 

1. Read data from expansive sources (character data, spells, abilities, rules, etc). 
2. Support loads of user interaction - clicks, scrolls, rolls, consumption of slots, rests. 
3. Support complex user interaction, like inventory management.
4. Support leveling up.
5. Support custom character bios and other user-generated content.
6. Be extremely responsive and accessible.

In short, the character sheet must be interactive, reactive, data-rich, accessible, responsive, and intuitive. And, it must be efficient: nobody wants to wait around while the browser calculates the outcome of a die roll, and nobody wants the character sheet to drain their device's battery on the fly, especially if they're playing on a mobile device. 

---

## The Objective

I will use Svelte to create a character sheet application for a custom TTRPG that has different game mechanics than DND. In a complementary article series, I will cover the game mechanics and play-testing headaches for those who are more interested in that. 

But how do I test it? How can I say for sure that the character sheet I have built satisfactorily solves the ethical and practical considerations I laid out earlier? How do I know I've built something efficient? 

First: In an abandoned, dusty place somewhere in my home, there lies a derelict tablet from the early 2010s that was sent as a freebie by my cell  company as part of a perk package. For a year, it endured extreme temperatures while strapped to my back in an Amazon freezer (long story, some other time). After that, it spent several years as a digital cookbook by the kitchen stove where it was thoroughly peppered by salt, fat, acid, and heat. 

It cannot load DND Beyond's character sheet. Actually, there's a lot of stuff it cannot load. It seems to me that the objective of SvelteQuest is quite clear: To load our custom character sheet on my crappy tablet, on a degraded internet connection. But, as most tabletoppers will attest, no quest is replete without a BBEG (Big Bad Evil Guy, basically putting the boss in bossfight) to strive against, so my second objective: Beat my current DND character sheet's Lighthouse scores. 

This is going to be quite the challenge.
