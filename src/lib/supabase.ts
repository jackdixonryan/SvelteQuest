import { createClient } from "@supabase/supabase-js";
// import { readable } from "svelte/store";

const client =  createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default client;