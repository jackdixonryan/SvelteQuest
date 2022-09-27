
<script lang="ts">
  import { createEventDispatcher } from "svelte";
import { prevent_default } from "svelte/internal";
  let characterName: string;
  let characterBio: string;
  let characterAppearance: string;

  const dispatch = createEventDispatcher();
</script>

<style>
  textarea {
    resize: vertical;
  }
</style>

<form>
  <div class="grid">
    <h1>Biography</h1>
    <p class="subtitle">Enter some biographical details about your character.</p>
    
    <label for="character-name">
      Name
      <input type="text" id="character-name" name="character-name" placeholder="Barry Abalone" bind:value={characterName} required />
    </label>

    <label for="character-bio">
      Biography
      <textarea name="character-bio" id="character-bio" cols="30" rows="10" bind:value={characterBio}></textarea>
    </label>

    <label for="character-appearance">
      Appearance
      <textarea name="character-appearance" id="character-appearance" cols="30" rows="10" bind:value={characterAppearance}></textarea>
    </label>
  </div>
</form>
<button on:click={() => { dispatch('bio-complete', { characterAppearance, characterBio, characterName })}}>
  Next: Species Selection
</button>
