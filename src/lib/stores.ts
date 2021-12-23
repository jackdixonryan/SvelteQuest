import { writable } from "svelte/store";
import supabase from "$lib/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
const { auth } = supabase;

// EXPORTING STORES 

export const user = writable(auth.user());

auth.onAuthStateChange((event: AuthChangeEvent, session: Session) => {
  user.set(auth.user());
});
