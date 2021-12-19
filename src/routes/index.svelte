<script lang="ts">
  import { user } from "../stores";
  import supabase from "$lib/supabase";

  user.set(supabase.auth.user());
  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session.user);
  });

</script>

{#if !$user}
  <h1>Welcome to SvelteQuest</h1>
  <h3>Start an Account</h3>
  <a href="/user/sign-up"><button>Here</button></a>
{:else}
  <h1>Welcome to an Authenticated Application!</h1>
{/if}