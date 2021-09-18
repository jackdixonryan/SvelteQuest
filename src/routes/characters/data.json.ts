import { characters } from "./characters";

export async function get({ params }) {
  return {
    body: {
      characters
    }
  }
}

export async function post(request) {
  const { body } = request;
  const { character } = body;
  if (!character) {
    return {
      status: 400,
      body: {
        error: "Request must include the `character` property."
      }
    }
  }

  const { name } = character;
  if (!name) {
    return {
      status: 400,
      body: {
        error: "Character was missing required fields."
      }
    }
  }

  // for our basic ID system.
  character.level = 1;
  character.created = new Date();
  character.id = (characters.length + 1).toString();

  characters.push(character);
  return {
    status: 201,
    body: {
      characters
    }
  }
}