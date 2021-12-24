<script lang="ts">
  import CharacterCreatorIntroduction from "../../components/CharacterCreator/CharacterCreatorIntroduction.svelte";

  function handleStart() {
    console.log("Looks like we started!");
  }
</script>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    padding-left: 2rem;
    padding-right: 2rem;
    left: 0;
    right: 0;
    border-top: 1px gray solid;
  }
</style>

<div>
  <CharacterCreatorIntroduction on:start={handleStart}></CharacterCreatorIntroduction>
  <nav class="bottom-nav">
    <ul>
      <li><strong>Character Creator</strong></li>
    </ul>
    <ul>
      <li>
        <button class="outline">Bio</button>
      </li>
      <li>
        <button class="outline">Species</button>
      </li>
      <li>
        <button class="outline">Skills</button>
      </li>
      <li>
        <button class="outline">Inventory</button>
      </li>
    </ul>
  </nav>
</div>