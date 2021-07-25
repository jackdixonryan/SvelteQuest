import { characters } from "./characters";

export async function get({ params }) {
  return {
    body: {
      characters
    }
  }
}