const characters = [
  {
    name: "almeira herrera",
    level: 12,
    created: new Date()
  },
  {
    name: "tripper trapper",
    level: 3,
    created: new Date("2021-07-03")
  },
  {
    name: "barry abalone",
    level: 23,
    created: new Date("2020-04-03")
  }
];

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

  characters.push(character);
  return {
    status: 201,
    body: {
      characters
    }
  }
}

export async function update(request) {

}

export async function del({ params }) {

}