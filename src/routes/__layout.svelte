<script lang="ts">
  import NavigationBar from "../components/NavigationBar.svelte";
</script>

<style>
  #main-layout { 
    background-color: #222629;
    color: white;
    font-family: "Montserrat", sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
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