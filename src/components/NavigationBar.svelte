
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
  nav {
    text-transform: uppercase;
  }

  button {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
</style>

<nav>
  <ul>
    <li>
      <a href="/"><strong>SvelteQuest</strong></a>
    </li>
  </ul>
  <ul>
    <li>
      <a href="/characters">
        <i class="fas fa-users"></i>
      </a>
    </li>
    <li>
      <a href="/combat">
        <i class="fas fa-fist-raised"></i>
      </a>
    </li>
    <li>
      <a href="/spells">
        <i class="fas fa-magic"></i>
      </a>
    </li>
    <li>
      <a href="/skills">
        <i class="fas fa-book-open"></i>
      </a>
    </li>
    <li>
      <a href="/user">
        <i class="fas fa-user"></i>
      </a>
    </li>
    { #if $user.authenticated }
    <li>
      <button on:click={signOut} class="outline">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </li>
    { :else } 
    <li>
      <a href="/user/sign-in">
        <i class="fas fa-sign-in-alt"></i>      
      </a>
    </li>
    { /if } 
  </ul>
</nav>
