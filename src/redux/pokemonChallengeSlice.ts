import { createSlice } from "@reduxjs/toolkit";

const pokemonChallengeSlice = createSlice({
  name: "pokemonChallenge",
  initialState: {
    trainer: {
      playerName: "",
      teamName: "",
      favoritePokemonType: "",
    },
    myPokemonList: [] as pokemonListElement[],
    myPokemonGenerations: [] as string[],
  },
  reducers: {
    updateTrainer: (state, payload) => {
      state.trainer = payload.payload;
    },
    updateMyPokemonList: (state, payload) => {
      state.myPokemonList = [...payload.payload];
    },
    updateMyPokemonGenerations: (state, payload) => {
      state.myPokemonGenerations = [...payload.payload];
    },
    resetPokemonChallengeSlice: (state) => {
      state.trainer = {
        playerName: "",
        teamName: "",
        favoritePokemonType: "",
      };
      state.myPokemonList = [];
      state.myPokemonGenerations = [];
    },
  },
});

export const {
  updateTrainer,
  updateMyPokemonList,
  resetPokemonChallengeSlice,
} = pokemonChallengeSlice.actions;
export default pokemonChallengeSlice.reducer;
