<script lang="ts">
  import { goto } from "$app/navigation";
  import supabase from "$lib/supabase";
  import user from "$lib/stores/user";

  const { auth } = supabase;

  let password: string;
  let email: string;
  let message: string;

  if ($user.authenticated) {
    goto("/");
  }

  // so that if the user hits the "enter" key they get redirected.
	function handleKeydown(event) {
		console.log(event);
	}

  async function signIn() {
    try {
      const { user, error } = await auth.signIn({ email, password });
      if (error) {
        message = error.message;
      } else if (user) {
        goto("/");
      }
    } catch(error) {
      message = error;
    }
  }

</script>

<svelte:window on:keydown={handleKeydown} />

<article>
  <h1>Sign In to SQ</h1>
  <label for="email">Email</label>
  <input type="text" name="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" bind:value={ password }/>
  <button on:click={ signIn }>Sign In</button>
  <footer>
    Don't have an account? <a href="/user/sign-up">Sign Up</a>
  </footer>
</article>