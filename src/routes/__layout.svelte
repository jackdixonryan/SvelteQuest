<script lang="ts">
  import NavigationBar from "../components/NavigationBar.svelte";
  import { userStore } from "../stores";
  import supabase from "$lib/supabase";

  userStore.set(supabase.auth.user());
  supabase.auth.onAuthStateChange((_, session) => {
    userStore.set(session.user);
  });
</script>

<style>
  #main-layout { 
    background-color: #222629;
    color: white;
    width: 100%;
    height: 100vh;
    font-family: "Montserrat", sans-serif;
  }

  #content {
    position: absolute;
    left: 6rem;
    padding: 1rem;
    width: 80%;
  }
</style>

<div id="main-layout">
  <NavigationBar></NavigationBar>
  <div id="content">
    <slot></slot>
  </div>
</div>