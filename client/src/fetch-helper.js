async function Call(baseUri, useCase, dtoIn, method) {
  // return fetch
  let response;
  // if method is falsy (NaN, undefined) or "GET"
  // clearer: (!method || (method === "get"))
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        // sends dtoIn if exists && contains keys, else ""
        dtoIn && Object.keys(dtoIn).length 
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  // if method is "POST"
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

// is redirect in package.json by "proxy": "http://localhost:8888",
const baseUri = "http://localhost:3000";

const FetchHelper = {
  splitCard: {
    create: async (dtoIn) => {
      return await Call(baseUri, "splitCard/create", dtoIn, "post");
    },
    listByGroupId: async (dtoIn) => {
      return await Call(baseUri, "splitCard/listByGroupId", dtoIn, "get");
    },
  },

  group: {
    create: async (dtoIn) => {
      return await Call(baseUri, "group/create", dtoIn, "post");
    },
    list: async () => {
      return await Call(baseUri, "group/list", null, "get");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "group/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "group/delete", dtoIn, "post");
    }
  },
};

export default FetchHelper;
