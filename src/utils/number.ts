const firstPokemonTrance = [1, 1025];
//const secondPokemonTrance = [10001, 10277];

export const getRandomPokemonId = (): number => {
  return Math.round(
    Math.random() * (firstPokemonTrance[1] - firstPokemonTrance[0]) +
      firstPokemonTrance[0]
  );
};
