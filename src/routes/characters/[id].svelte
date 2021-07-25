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
  let level = character.level;

  async function levelUp(): Promise<void> {

    const response = await fetch(`/characters/${character.id}.json`, {
      method: 'PATCH', 
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ level })      
    });

    if (response.ok) {
      // so that our page also reacts to the change.
      character.level++;
    }
  }

  async function deleteCharacter(): Promise<void> {
    const sure = confirm("Do you really want to?");
    if (sure) {
      const response = await fetch(`/characters/${character.id}.json`, {
        method: 'DELETE'
      });
      
      // redirect from the page if successful because this page will break.
      if (response.ok) {
        location.replace('/characters');
      }
    }
  }
</script>

<style></style>

<h1>{ character.name }</h1>
<p>Level { character.level }</p>
<p>Created on { character.created }</p>
<button on:click={levelUp}>Level Up!</button>
<button on:click={deleteCharacter}>Delete this Character</button>
