import { characters } from "./characters";

export async function get({ params }) {
  const { id } = params;
  const character = characters.find((c) => c.id === id);
  if (!character) {
    return {
      status: 404,
      body: {
        error: "Character not found."
      }
    }
  }
  return {
    status: 200,
    body: {
      character
    }
  }
}

export async function patch(request) {
  const { body, params } = request;
  const { id } = params;
  const { level } = body;

  if (!id || !level) {
    return {
      status: 400
    }
  }
  
  const character = characters.find((c) => c.id === id);
  if (!character) {
    return {
      status: 404
    }
  }

  character.level = level;
  return {
    status: 201,
    character
  }
}