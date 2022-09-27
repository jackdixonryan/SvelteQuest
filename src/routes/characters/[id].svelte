<script context="module" lang="ts">
  import supabase from "$lib/supabase";
  export async function load({ page, fetch, session, context }) {
    const characterId = page.params.id;
    const { data: characters, error } = await supabase.from("characters")
      .select("*")
      .eq("id", characterId);

    if (error) {
      throw new Error(error.message);
    }

    const character = characters[0];

    return {
      props: {
        character
      }
    }
  }
</script>

<script lang="ts">
  export let character;
  console.log(character);
</script>

<article>
  <hgroup>
    <h1>{ character.name }</h1>
    <h2>Level { character.level } { character.class }</h2>
  </hgroup>

  <hgroup>
    <h3>Hitpoints</h3>
    <h2>{ character.currentHp } / { character.maxHp }</h2>
  </hgroup>
  
  <nav>
    <ul>
      <li role="button">
        <button>Bio</button>
      </li>
      <li>
        <button>Inventory</button>
      </li>
      <li>
        <button>Actions</button>
      </li>
      <li>
        <button>Spells</button>
      </li>
    </ul>
  </nav>
</article>
