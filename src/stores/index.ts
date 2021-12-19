
import { writable } from "svelte/store";

// export const authStore = writable<{
//   isLoggedIn: boolean;
//   user?: User
// }> ({
//   isLoggedIn: false,
//   user: authentication.user || null
// });

export const user = writable();
