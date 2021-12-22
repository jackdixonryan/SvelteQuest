<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Session, User } from "@supabase/gotrue-js";
  import supabase from "$lib/supabase";

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
      const user: NewUser = await auth.signUp({ email, password });
      if (user) {
        goto("/");
      }
    } catch(error) {
      message = error;
    }
  }

</script>

<style>

  #sign-up-form {
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

<div id="sign-up-form">
  <h1>Sign Up</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signUp }>Sign Up</button>
  {#if message } 
    <p class="error-message"> { message } </p>
  { /if }
</div>