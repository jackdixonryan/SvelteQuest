<script lang="ts">
  import { userStore } from "../stores";
  import supabase from "$lib/supabase";

  userStore.set(supabase.auth.user());
  supabase.auth.onAuthStateChange((_, session) => {
    userStore.set(session.user);
  });

</script>

{#if !$userStore}
  <h1>Welcome to SvelteQuest</h1>
  <h3>Start an Account</h3>
  <a href="/user/sign-up"><button>Here</button></a>
{:else}
  <h1>Welcome to an Authenticated Application!</h1>
{/if}