<script lang="ts">
  import CharacterCreatorIntroduction from "../../components/CharacterCreator/CharacterCreatorIntroduction.svelte";
  import CharacterCreatorBio from "../../components/CharacterCreator/CharacterCreatorBio.svelte";
  import CharacterCreatorSpecies from "../../components/CharacterCreator/CharacterCreatorSpecies.svelte";

  class CharacterCreator {
    character: any;
    complete: boolean;
    completeByStep: any;
    currentStep: string;
    constructor() {
      this.character = {
        // start with some basic string fields to show how it works. 
        name: null,
        age: null,
        appearance: null,
        bio: null,
        species: null,
      },
      this.complete = false;
      this.completeByStep = {
        bio: false,
        species: false,
        skills: false,
        inventory: false,
      }
      this.currentStep = "species";
    }  
  }

  const creator = new CharacterCreator();

  function handleStart() {
    creator.currentStep = "bio";
  }

  function handleBioComplete(event) {
    const bio = event.detail;
    const { characterAppearance, characterBio, characterName } = bio;

    creator.character.name = characterName;
    creator.character.appearance = characterAppearance;
    creator.character.bio = characterBio;
    if (characterName) {
      creator.currentStep = "species";
    }// error is handled elsewhere. 
  }

  function handleSpeciesComplete(event) {
    const species = event.detail;
    creator.character.species = species;
  }
</script>

<div>
  { #if creator.currentStep === "start" }
  <CharacterCreatorIntroduction on:start={handleStart}></CharacterCreatorIntroduction>
  { :else if creator.currentStep === "bio" }
  <CharacterCreatorBio on:bio-complete={handleBioComplete}></CharacterCreatorBio>
  { :else if creator.currentStep === "species"}
  <CharacterCreatorSpecies on:species-complete={handleSpeciesComplete}></CharacterCreatorSpecies>
  { /if }
  <nav class="bottom-nav">
    <ul>
      <li><strong>Character Creator</strong></li>
    </ul>
    <ul>
      <li>
        <button class="outline" on:click={() => creator.currentStep = "bio"}>Bio</button>
      </li>
      <li>
        <button class="outline" on:click={() => creator.currentStep = "species"}>Species</button>
      </li>
      <li>
        <button class="outline" on:click={() => creator.currentStep = "skills"}>Skills</button>
      </li>
      <li>
        <button class="outline" on:click={() => creator.currentStep = "inventory"}>Inventory</button>
      </li>
    </ul>
  </nav>
</div>