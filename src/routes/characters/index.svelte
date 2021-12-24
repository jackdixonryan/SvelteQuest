<!-- Let's start by laying out the basic syntax of our file. -->
<!-- It's web dev 101, basically. Script tags, style tags, markup. -->
<!-- JavaScript is not the language of the web. Don't let JS developers -->
<!-- mislead you. HTML is the language of the web. -->

<script lang="ts">
  import user from "$lib/stores/user";
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
  {#each $user.characters as character}
    <div class="character-tile">
      <h3>{character.name}</h3>
      <p><strong>Level:</strong> {character.level}</p>
      <p><strong>Created On:</strong> {character.created_at}</p>
    </div>
  {/each}
</ul>