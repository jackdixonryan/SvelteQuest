<script lang="ts">
  import { goto } from "$app/navigation";
  import authentication from "$lib/supabase/auth";
  import type { User } from "@supabase/gotrue-js";
  import {authStore} from "../../stores";

  let password: string;
  let email: string;

  authStore.subscribe((user) => {
    if (user.isLoggedIn) {
      goto("/characters");
    }
  });

  async function signIn() {
    try {
      const user: User = await authentication.signIn(email, password);
      if (user) {
        goto("/");
      }
    } catch(error) {
      alert(error);
    }
  }

</script>

<div id="sign-in-form">
  <h1>Sign In</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signIn }>Sign In</button>
</div>