import { createClient } from "@supabase/supabase-js";
// import { readable } from "svelte/store";

const db =  createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default db;