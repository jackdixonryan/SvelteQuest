<script lang="ts">
  import { goto } from "$app/navigation";
  import authentication from "$lib/supabase/auth";
  import type { User } from "@supabase/gotrue-js";

  let password: string;
  let email: string;
  let message;

  async function signIn() {
    try {
      const user: User = await authentication.signIn(email, password);
      if (user) {
        goto("/");
      }
    } catch(error) {
      message = error;
    }
  }

</script>

<style>

  #sign-in-form {
    width: 25rem;
    border: 1px black solid;
    padding: 2rem;
    border-radius: 0.5rem;
    margin: 0 auto;
    margin-top: 12rem;
    font-family: 'Baskerville', Courier, monospace;
  }

  label {
    font-size: 1rem;
  }

  input {
    width: 80%;
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    padding: 1rem;
  }

  button {
    font-size: 1rem;
    padding: 1rem;
    background: none;
    border: 1px black solid;
    outline: none;
    cursor: pointer;
  }

  .error-message {
    color: red;
  }
</style>

<div id="sign-in-form">
  <h1>Sign In</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signIn }>Sign In</button>
  {#if message } 
    <p class="error-message"> { message } </p>
  { /if }
</div>