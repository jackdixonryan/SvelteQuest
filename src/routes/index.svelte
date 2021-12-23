<script lang="ts">
  import { user } from "$lib/stores";
  // we need to fetch the nitty gritty of the user's state. 
  // on the homepage, I want to know three things after auth:

  // Does the user have a character created yet?
  // Does the user have a campaign they belong to? 

</script>

<style>
  h1 {
    font-size: 2rem;
  }

  #main-content {
    text-align: center;
    width: 100%;
    margin-top: 1rem;
  }

  .card { 
    padding: 1.5rem;
    width: 90%;
    margin: 0 auto;
    background-color: #61892F;
    -moz-box-shadow:    3px 3px 5px 6px #222629;
    -webkit-box-shadow: 3px 3px 5px 6px #222629;
    box-shadow:         3px 3px 5px 6px #222629;
    margin: 2rem;
  }

  .card-title {
    font-size: 1.35rem;
    font-weight: bold;
  }

  #cards {
    margin: 1.5rem;
  }

  .card-text {
    padding: 1rem;
    text-align: justify;
    line-height: 140%;
  }

  .cta-button {
    border: none;
    outline: none;
    padding: 1.25rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;
    color: #474b4f;
  }
</style>

<div id="main-content">
  <p>Welcome to</p>
  <h1>SvelteQuest</h1>
  <!-- might need to make these sub-components... -->
  <div id="cards">
    {#if $user}
    <div class="card" id="current-campaign"></div>
    <div class="card" id="current-session"></div>
    <div class="card" id="characters"></div>
    {:else}
    <div class="card" id="cta">
      <p class="card-title">Join the Adventure!</p>
      <p class="card-text">We all love 5e. That is not a secret. But sometimes, doesn't it feel a bit limiting? A barbarian can smash, a bard can sing, and aside from multiclassing, nobody can break free from their class boundaries. That's why we came up with SQ, an adventure TTRPG that lets you build a character off of skill trees, rather than stats. Your character's experiences and decisions fuel their progression, and the way you interact with the world changes who you are.</p>
      <a href="/user/sign-up">
        <button class="cta-button">Sign Up Now!</button>
      </a>
    </div>
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
