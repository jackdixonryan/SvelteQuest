import type { User } from "@supabase/gotrue-js";
import db from "./config";

const authentication = (function module() {
  "use strict";

  const { auth } = db;

  return {
    async signIn(email: string, password: string): Promise<User|Error> {
      const { user, error } = await auth.signIn({
        email, password
      });

      if (error) {
        return error;
      } 

      return user;
    },

    async signOut() {
      await auth.signOut();
    },
    // registers a new user to the supabase authentication database.
    async register(email: string, password: string): Promise<User|Error> {
      // password parameters go here
      const { user, error } = await auth.signUp({
        email, password
      });

      if (error) {
        return error;
      }

      return user;  
    }
  }
})();

export default authentication;