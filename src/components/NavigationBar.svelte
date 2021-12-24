
<script lang="ts"> 
  import user from "$lib/stores/user";
  import supabase from "$lib/supabase";
  import { goto } from "$app/navigation";
  const { auth } = supabase;

  // after the user signs out, send them home.
  async function signOut() {
    await auth.signOut();
    goto('/');
  }
</script>

<style>
</style>

<nav>
  <ul>
    <li><strong>SvelteQuest</strong></li>
  </ul>
  <ul>
    <li>
      <a href="/characters">characters</a>
    </li>
    <li>
      <a href="/combat">combat</a>
    </li>
    <li>
      <a href="/spells">spells</a>
    </li>
    <li>
      <a href="/skills">skills</a>
    </li>
    <li>
      <a href="/user">account</a>
    </li>
    { #if $user.authenticated }
    <li>
      <button on:click={signOut}>Sign Out</button>
    </li>
    { :else } 
    <li>
      <a href="/user/sign-in">sign in</a>
    </li>
    { /if } 
  </ul>
</nav>
