<!-- Let's start by laying out the basic syntax of our file. -->
<!-- It's web dev 101, basically. Script tags, style tags, markup. -->
<!-- JavaScript is not the language of the web. Don't let JS developers -->
<!-- mislead you. HTML is the language of the web. -->

<script lang="ts">
  import user from "$lib/stores/user";
</script>

<h1>My Characters</h1>
<!-- Now we can run an each loop to display the data. -->
<ul>
  {#each $user.characters as character}
    <article>
      <hgroup>
        <h4>{ character.name }</h4>
        <h5>Level {character.level} { character.class }</h5>
      </hgroup>
      <footer>
        <a href={`/characters/${character.id}`} role="button">View</a>
      </footer>
    </article>
  {/each}
  <article>
    <h3>Create a New Character</h3>
    <footer>
      <a href="/characters/create" role="button">Enter Character Creator</a>
    </footer>
  </article>
</ul>