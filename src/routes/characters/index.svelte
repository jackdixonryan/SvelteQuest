
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