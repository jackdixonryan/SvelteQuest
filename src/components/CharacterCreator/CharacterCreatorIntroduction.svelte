<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<style>
  p {
    text-align: justify;
  }
</style>

<h1>Welcome to the SQ Character Creator!</h1>
<p>This page will walk you through every step of character creation. Use the tabs at the bottom of this page to navigate freely through the forms in this process, or follow along with the guided character creation experience.</p>
<p>You may leave this page at any time. If you wish to keep track of your progress, hit the save button at the top of the page, and your progress will be tracked.</p>
<button on:click={() => dispatch('start')}>Get Started</button>
