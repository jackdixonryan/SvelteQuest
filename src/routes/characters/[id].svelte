<script context="module" lang="ts">
  export async function load({ page, fetch, session, context }) {
    const url = `/characters/${page.params.id}.json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const { character } = data;
      return { 
        props: {
          character
        }
      }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    }
  }
</script>

<script lang="ts">
  import type { Character } from "../../types";
  export let character: Character;

  async function levelUp() {
    const { level } = character;
    const newLevel = level + 1;

    const response = await fetch(`/characters/${character.id}.json`, {
      method: 'PATCH', 
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ level: newLevel })      
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); 
    }
  }
</script>

<style></style>

<h1>{ character.name }</h1>
<p>Level { character.level }</p>
<p>Created on { character.created }</p>
<button on:click={levelUp}>Level Up!</button>
