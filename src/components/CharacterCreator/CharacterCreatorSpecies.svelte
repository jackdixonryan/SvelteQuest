<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const speciesList = [
    { 
      name: "human",
      description: "Middle height, rounded ears, hair atop the head. Otherwise, oddly hairless."
    },
    { 
      name: "elf",
      description: "Taller than ordinary, pointed ears, otherwise basically a human. Oh, immortal."
    }, 
    { 
      name: "dwarf",
      description: "Short, stout, hairy."
    }, 
    {
      name: "goblin",
      description: "short, skinny, typically green."
    }, 
    { 
      name: "orc",
      description: "Goblin, only taller and muscular."
    }, 
    {
      name: "satyr",
      description: "The top bit is a gnome. The bottom bit is a goat."
    }, 
    { 
      name: "gnome",
      description: "Short, hairy, but decidedly not stout."
    }, 
    { 
      name: "hobbit",
      description: "Short, stout, but the hair tends to be on the feet."
    }
  ]
</script>

<h1>Species</h1>
<p>Although SQ will encourage people to build their own species for more immersive, intricate campaigns, we will offer a couple starter species for those players who are looking for the more traditional fantasy route.</p>
<h3>Species List </h3>
<ul>
  { #each speciesList as species }
  <article>
    <h4>{ species.name.toUpperCase() }</h4>
    <p>{ species.description }</p>
    <footer>
      <button class="secondary outline" on:click={() => dispatch('species-complete', species.name )}>
        Select
      </button>
    </footer>
  </article>
  { /each }
</ul>