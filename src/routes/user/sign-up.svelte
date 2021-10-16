<script lang="ts">
  import { goto } from "$app/navigation";
  import authentication from "$lib/supabase/auth";
  import type { User } from "@supabase/gotrue-js";
  import {authStore} from "../../stores";

  let password: string;
  let strength;

  $: {
    console.log(password);
    strength = evaluatePasswordStrength();
    console.log(strength);
  }

  let email: string;

  // returns "STRONG" "MEDIUM" "WEAK" based on user password strength.
  function evaluatePasswordStrength(): string {
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    if (strongPassword.test(password)) {
      return "strong";
    } else if (mediumPassword.test(password)) {
      return "medium";
    } else {
      return "weak"
    }
  }

  authStore.subscribe((user) => {
    if (user.isLoggedIn) {
      goto("/characters");
    }
  });

  async function signUp() {
    try {
      const user: User = await authentication.signUp(email, password);
      if (user) {
        goto("/");
      }
    } catch(error) {
      alert(error);
    }
  }

</script>

<div id="sign-up-form">
  <h1>Sign Up</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signUp } disabled={ strength === "weak" }>Sign Up</button>
</div>