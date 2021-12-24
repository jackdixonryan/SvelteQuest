<script lang="ts">
  const speciesList = [
    {
      name: "human",
      description: "A species of average height and build, humans are as versatile as they are varied. Adaptable and quick-learning, humans have spread to every corner of the globe."
    },
    {
      name: "dwarf",
    }
  ];
</script>

<style>

</style>

<div>
  <div id="top-card">
    <div id="name">
      <label for="character-name">Character Name</label>
      <input type="text" name="character-name" id="character-name" />
    </div>
    <div id="species-selection">
      { #each speciesList as species }
        <div class="species">
          <p class="card-title">{ species.name }</p>
          <p class="card-text">{ species.description }</p>
        </div>
      { /each }
    </div>
  </div>
</div>