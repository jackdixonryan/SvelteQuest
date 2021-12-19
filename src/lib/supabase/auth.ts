import type { User } from "@supabase/gotrue-js";
import db from "./index";

const authentication = (function module() {
  "use strict";

  const { auth } = db;

  function getUser(): User {
    return auth.user() || null;
  }

  return {
    async signIn(email: string, password: string): Promise<User> {
      const { user, error } = await auth.signIn({
        email, password
      });

      if (error) {
        throw new Error(error.message);
      } 

      return user;
    },

    async signOut() {
      await auth.signOut();
    },
    // registers a new user to the supabase authentication database.
    async signUp(email: string, password: string): Promise<User> {
      // password parameters go here
      const { user, error } = await auth.signUp({
        email, password
      });

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }

      return user;  
    },
    user: getUser()
  }
})();

export default authentication;