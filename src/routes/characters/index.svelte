<!-- Let's start by laying out the basic syntax of our file. -->
<!-- It's web dev 101, basically. Script tags, style tags, markup. -->
<!-- JavaScript is not the language of the web. Don't let JS developers -->
<!-- mislead you. HTML is the language of the web. -->

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