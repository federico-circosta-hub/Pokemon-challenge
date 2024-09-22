import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import pokemonChallengeReducer from "./pokemonChallengeSlice";
import { pokemonChallengeApi } from "./api/pokemonChallengeApi";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, pokemonChallengeReducer);

export const store = configureStore({
  reducer: {
    pokemonChallenge: persistedReducer,
    [pokemonChallengeApi.reducerPath]: pokemonChallengeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(pokemonChallengeApi.middleware),
});

export const persistor = persistStore(store);
