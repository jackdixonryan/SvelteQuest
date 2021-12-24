<script lang="ts">
  import user from "$lib/stores/user";
</script>

<h1>Welcome to SvelteQuest!</h1>
<!-- might need to make these sub-components... -->
{#if $user.authenticated}
<article>
  {#if $user.campaigns.length > 0}
    <h3>Your Current Campaigns</h3>
  {:else}
    <h3>Create or Join a Campaign</h3>
    <p>Looks like you're not in a campaign right now. Create a new campaign for your party, or join an existing campaign with a code.</p>
    <button>Join a Campaign</button>
    <button class="secondary">Create a Campaign</button>
  {/if}
</article>
<!-- { #if $user.sessionQuickjoin }
<article>
</article>
{ /if } -->
<article>
  <h3>Recent Characters</h3>
  { #if $user.characters }
    { #each $user.characters as character }
    <article>
      <hgroup>
        <h4>{ character.name }</h4>
        <h5>Level { character.level } { character.class }</h5>
      </hgroup>
      <footer>
        <a href={`/characters/${character.id}`}>View Character</a>
      </footer>
    </article>
    { /each }
  { :else }
    <p>Create your first character to get started with SQ!</p>
    <button>Create a Character</button>
  { /if }
</article>
{:else}
<article>
  <h3>Join the Adventure!</h3>
  <p>We all love 5e. That is not a secret. But sometimes, doesn't it feel a bit limiting? A barbarian can smash, a bard can sing, and aside from multiclassing, nobody can break free from their class boundaries. That's why we came up with SQ, an adventure TTRPG that lets you build a character off of skill trees, rather than stats. Your character's experiences and decisions fuel their progression, and the way you interact with the world changes who you are.</p>
  <a href="/user/sign-up">
    <button>Sign Up Now!</button>
  </a>
</article>
<article>
  <h3>Just Exploring?</h3>
  <p>Want to take a look at the skill trees, spells, and monsters in SQ before creating an account? Browse through our resources to see if SQ is right for your party.</p>
  <a href="/skills">
    <button>Browse Skills</button>
  </a>
</article>
{/if}
