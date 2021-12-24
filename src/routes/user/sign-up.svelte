<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Session, User } from "@supabase/gotrue-js";
  import supabase from "$lib/supabase";
  import user from "$lib/stores/user";

  if ($user.authenticated) {
    goto("/");
  }

  const { auth } = supabase;

  type NewUser = {
    user: User;
    session: Session;
    error: Error;
    data: User | Session;
  }

  let password: string;
  let email: string;
  let message: string;

  async function signUp() {
    try {
      const { user, error }: NewUser = await auth.signUp({ email, password });
      if (error) {
        message = error.message;
      } else if (user) {
        console.log(user);
        goto("/");
      }
    } catch(error) {
      console.log(error);
      message = error;
    }
  }

</script>

<article>
  <h1>Sign Up</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signUp }>Sign Up</button>
  <footer>
    Already have an account? <a href="/user/sign-in">Sign in.</a>
  </footer>
</article>