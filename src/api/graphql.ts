// src/api/graphql.ts
const GRAPHQL_ENDPOINT = "http://13.200.172.225:1337/graphql";

export const graphqlRequest = async (query: string, variables?: any) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL Error:", result.errors);
    throw new Error(result.errors[0].message);
  }

  return result.data;
};
