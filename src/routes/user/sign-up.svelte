<script lang="ts">
  import { goto } from "$app/navigation";
  import authentication from "$lib/supabase/auth";
  import type { Provider, User } from "@supabase/gotrue-js";
  import {authStore} from "../../stores";

  let password: string;
  let strength;

  $: {
    strength = evaluatePasswordStrength();
  }

  let email: string;

  // returns "STRONG" "MEDIUM" "WEAK" based on user password strength.
  function evaluatePasswordStrength(): string {
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    if (strongPassword.test(password)) {
      return "strong";
    } else {
      return "weak";
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

  async function SSOGithub() {
    try {
      const user: User = await authentication.SSO("github");
      if (user) {
        goto("/");
      }
    } catch (error) {
      alert(error);
    }
  }

  async function SSOTwitch() {
    try {
      const user: User = await authentication.SSO("twitch");
      if (user) {
        goto("/");
      }
    } catch (error) {
      alert(error);
    }
  }

  async function SSOGoogle() {
    try {
      const user: User = await authentication.SSO("google");
      if (user) {
        goto("/");
      }
    } catch (error) {
      alert(error);
    }
  }

</script>

<div id="sign-up-form">
  <h1>Sign Up</h1>
  <div id="sign-up-email-password">
    <label for="email">Email</label>
    <input type="text" name="email" id="email" bind:value={ email } />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" bind:value={ password }/>
    <button on:click={ signUp } disabled={ strength === "weak" }>Sign Up</button>
  </div>
  <h1>OR</h1>
  <div id="sign-up-sso">
    <button on:click={ SSOGithub }>Sign Up With Github</button>
    <button on:click={ SSOTwitch }>Sign Up With Twitch</button>
    <button on:click={ SSOGoogle }>Sign Up With Google</button>
  </div>
</div>