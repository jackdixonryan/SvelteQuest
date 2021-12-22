<script lang="ts">
  import { userStore } from "../stores";
  let user;
  userStore.subscribe((value) => {
    user = value;
  });

  console.log(user);
</script>

<style>
  h1 {
    font-size: 1.5rem;
  }
</style>

{#if !$userStore}
  <h1>Welcome to SQ</h1>
  <h3>Start an Account</h3>
  <a href="/user/sign-up"><button>Here</button></a>
{:else}
  <h1>Welcome to SvelteQuest, { user.email }!</h1>
{/if}