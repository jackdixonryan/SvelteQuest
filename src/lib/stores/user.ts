import { writable } from "svelte/store";
import supabase from "$lib/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
const { auth } = supabase;

// EXPORTING STORES 

async function getCharacters(userId: string): Promise<any[]> {
  const { data: characters, error } = await supabase.from('characters')
	  .select('name, id, class, level, created_at')
	  .eq('user', userId);

  if (error) {
    console.log(error);
  } 

  console.log("Characters:");
  console.log(characters);

  if (characters) {
    return characters;
  } else {
    return [];
  }
}

const user = writable({
  authenticated: auth.user() ? true : false,
  id: auth.user()?.id || null,
  details: auth.user(),
  characters: [],
  campaigns: [],
});

auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session) => {
  user.set({
    authenticated: auth.user() ? true : false,
    id: auth.user().id,
    details: auth.user(),
    characters: await getCharacters(auth.user()?.id),
    campaigns: [],
  });
});

export default user;