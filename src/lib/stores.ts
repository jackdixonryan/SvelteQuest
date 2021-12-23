import { writable } from "svelte/store";
import supabase from "$lib/supabase";
const { auth } = supabase;

// EXPORTING STORES 

export const user = writable(auth.user());