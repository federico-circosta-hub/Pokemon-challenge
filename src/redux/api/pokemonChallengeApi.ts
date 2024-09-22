import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonChallengeApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  tagTypes: ["types", "pokemon"],
  endpoints: (builder) => ({
    getPokemonTypes: builder.query({
      query: () => ({
        url: "/type?limit=60",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["types"],
    }),
    getPokemon: builder.query({
      query: ({ limit, offset }) => ({
        url: `/pokemon?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["pokemon"],
    }),
    getPokemonByIdOrName: builder.query({
      query: (idOrName) => ({
        url: `/pokemon/${idOrName}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["types"],
    }),
    getPokemonSpecies: builder.query({
      query: (name) => ({
        url: `/pokemon-species/${name}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetPokemonTypesQuery,
  useLazyGetPokemonSpeciesQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonQuery,
  useLazyGetPokemonByIdOrNameQuery,
  useGetPokemonByIdOrNameQuery,
} = pokemonChallengeApi;
