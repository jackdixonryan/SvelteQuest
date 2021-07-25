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

  const { name, level, created } = character;
  if (!name || !level || !created) {
    return {
      status: 400,
      body: {
        error: "Character was missing required fields."
      }
    }
  }

  // for our shitty ID system.
  character.id = (characters.length + 1).toString();

  characters.push(character);
  return {
    status: 201,
    body: {
      characters
    }
  }
}