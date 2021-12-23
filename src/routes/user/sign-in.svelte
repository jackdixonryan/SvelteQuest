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

<div id="sign-in-form">
  <h1>Sign In to SQ</h1>
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={ email } />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={ password }/>
  <button on:click={ signIn }>Sign In</button>
  {#if message } 
    <p class="error-message"> { message } </p>
  { /if }
</div>

<style>

  #sign-in-form {
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
