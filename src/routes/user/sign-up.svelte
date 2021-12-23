<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Session, User } from "@supabase/gotrue-js";
  import supabase from "$lib/supabase";
  import { user } from "$lib/stores/user";

  if ($user) {
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

<style>

  #sign-up-form {
    background-color: #474b4f;
    width: 25rem;
    margin: 0 auto;
    margin-top: 10rem;
    font-family: 'Montserrat', Courier, sans-serif;
    text-align: center;
    padding: 3rem;
    text-transform: uppercase;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  label {
    font-size: 1rem;
  }

  input {
    width: 90%;
    margin: 0 auto;
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    padding: 1rem;
  }

  button {
    background-color: #61892F;
    color: white;
    font-size: 1rem;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    outline: none;
    cursor: pointer;
    box-shadow: none;
    text-transform: uppercase;
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