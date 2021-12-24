<script lang="ts">
  import user from "$lib/stores/user";
  // we need to fetch the nitty gritty of the user's state. 
  // on the homepage, I want to know three things after auth:

  // Does the user have a character created yet?
  // Does the user have a campaign they belong to? 

  console.log($user);

</script>

<div>
  <h3>Welcome to</h3>
  <h1>SvelteQuest</h1>
  <!-- might need to make these sub-components... -->
  <div id="cards">
    {#if $user.authenticated}
    <article>
      {#if $user.campaigns.length > 0}
        <p class="card-title">Your Current Campaigns</p>
      {:else}
        <p class="card-title">Create or Join a Campaign</p>
        <p class="card-text">Looks like you're not in a campaign right now. Create a new campaign for your party, or join an existing campaign with a code.</p>
        <button class="cta-button">Create a Campaign</button>
        <button class="cta-button">Join a Campaign</button>
      {/if}
    </article>
    <article></article>
    <article>
      <p class="card-title">Characters</p>
      { #if $user.characters }
        { #each $user.characters as character }
          <p class="card-text">{ character.name }</p>
          <p class="sub-text">Level { character.level } { character.class }</p>
        { /each }
      { :else }
        <p class="card-text">Create your first character to get started with SQ!</p>
        <button class="cta-button">Create a Character</button>
      { /if }
    </article>
    {:else}
    <article>
      <p class="card-title">Join the Adventure!</p>
      <p class="card-text">We all love 5e. That is not a secret. But sometimes, doesn't it feel a bit limiting? A barbarian can smash, a bard can sing, and aside from multiclassing, nobody can break free from their class boundaries. That's why we came up with SQ, an adventure TTRPG that lets you build a character off of skill trees, rather than stats. Your character's experiences and decisions fuel their progression, and the way you interact with the world changes who you are.</p>
      <a href="/user/sign-up">
        <button class="cta-button">Sign Up Now!</button>
      </a>
    </article>
    <div class="card" id="browse-skills">
      <p class="card-title">Just Exploring?</p>
      <p class="card-text">Want to take a look at the skill trees, spells, and monsters in SQ before creating an account? Browse through our resources to see if SQ is right for your party.</p>
      <a href="/skills">
        <button class="cta-button">Browse Skills</button>
      </a>
    </div>
    {/if}
  </div>
</div>
