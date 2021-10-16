
import { createClient } from "@supabase/supabase-js";
// import { readable } from "svelte/store";

const db =  createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default db;
// export const user = readable(db.auth.user(), (set) => {
//   db.auth.onAuthStateChange((event, session) => {
//     if (event === 'SIGNED_OUT') {
//       set(null);
//     }
//   });
// });

// export const auth = db.auth;

// export const products = {
//   async all() {
//     const { data } = await db
//       .from('products')
//       .select('*');

//     return data;
//   } 
// }