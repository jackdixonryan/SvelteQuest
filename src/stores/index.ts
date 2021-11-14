
import type { User } from "@supabase/gotrue-js";
import { writable } from "svelte/store";
import authentication from "$lib/supabase/auth";

export const authStore = writable<{
  isLoggedIn: boolean;
  user?: User;
}> ({

  isLoggedIn: authentication.user?.aud === "authenticated" || false,
  user: authentication.user || null
});