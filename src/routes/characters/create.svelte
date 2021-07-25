<script lang="ts">
  $: name = '';
  $: {
    console.log(`Name is now ${name}.`);
  }
  async function createCharacter(): Promise<void> {
    const created = new Date();
    const level = 1;
    const character = { created, level, name };
    const response = await fetch("/characters/data.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character })
    });
    const data = await response.json();
    if (response.status === 201) {
      // this is  how we know the request succeeded. 
      location.replace('/characters');
    } else {
      alert("There was a problem creating the user!");
    }
  }
</script>

<style>

</style>

<div id="character-creation-form">
  <input type="text" name="character-name" id="character-name" bind:value={name} />
  <button on:click={createCharacter}>Create New Character</button>
</div>