<script lang="ts">
  import { userStore } from "../stores";
  let user;

  userStore.subscribe((value) => {
    user = value;
  });

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
</style>

<div id="main-content">
{#if !$user}
  <p>Welcome to</p>
  <h1>SvelteQuest</h1>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
{:else}
  <h1>Welcome to SvelteQuest, { user.email }!</h1>
{/if}
</div>
