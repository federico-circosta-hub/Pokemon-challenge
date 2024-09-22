import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { green } from "@mui/material/colors";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PokemonTable from "../../Miscellaneus/PokemonTable";
import CustomSnackBar from "../../Miscellaneus/CustomSnackBar";
import {
  useLazyGetPokemonByIdOrNameQuery,
  useLazyGetPokemonSpeciesQuery,
} from "../../../redux/api/pokemonChallengeApi";
import { getRandomPokemonId } from "../../../utils/number";

const MyTeamSelection = ({
  opponentPokemonList,
  setOpponentPokemonList,
}: {
  opponentPokemonList: pokemonListElement[];
  setOpponentPokemonList: Function;
}) => {
  const myPokemonListRedux = useSelector(
    (state: any) => state.pokemonChallenge.myPokemonList
  );

  const [isOpponentPokemonGenerating, setIsOpponentPokemonGenerating] =
    useState<boolean>(false);
  const [myPokemonList] = useState<pokemonListElement[]>([
    ...myPokemonListRedux,
  ]);
  const [myGenerations, setMyGenerations] = useState<string[]>([]);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  const [getPokemonSpecies] = useLazyGetPokemonSpeciesQuery();
  const [getPokemonByIdOrName] = useLazyGetPokemonByIdOrNameQuery();

  useEffect(() => {
    setupMyPokemonGenerations();
    // eslint-disable-next-line
  }, []);

  const setupMyPokemonGenerations = async () => {
    const newData = myPokemonList.map(async (e: pokemonListElement) => {
      let gen = "";
      await getPokemonSpecies(e.name)
        .unwrap()
        .then((data) => {
          gen = data.generation.name;
        })
        .catch((e) => console.error(e));
      return gen;
    });
    Promise.all(newData).then((resolvedData) => {
      setMyGenerations(resolvedData);
    });
  };

  const generateOpponentPokemon = async () => {
    setIsOpponentPokemonGenerating(true);
    let opponentPokemonTeam: pokemonListElement[] = [];
    while (opponentPokemonTeam.length < 4) {
      let randId = getRandomPokemonId();
      await getPokemonByIdOrName(randId)
        .unwrap()
        .then(async (pokemon) => {
          await getPokemonSpecies(randId)
            .unwrap()
            .then((spec) => {
              if (!myGenerations.includes(spec.generation.name)) {
                const pokemonToAdd: pokemonListElement = {
                  img: pokemon.sprites.front_default,
                  name: pokemon.name,
                  type: pokemon.types.map((type: any) => type.type.name),
                };
                opponentPokemonTeam.push(pokemonToAdd);
              }
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
    setOpponentPokemonList(opponentPokemonTeam);
    setShowSnackBar(true);
    setIsOpponentPokemonGenerating(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-8">
      <img
        src={require("../../../assets/imgs/Pokemon_Trainer_Male.png")}
        alt="Pokemon-trainer"
        width={"228rem"}
      />
      <div className="w-3/5 flex gap-4 items-center">
        <Box className="w-1/2 flex flex-col bg-white p-5 rounded-lg gap-2 relative">
          <Typography variant="h6" fontWeight={600}>
            Great, you're almost ready!
          </Typography>

          <PokemonTable
            data={myPokemonList}
            icon={<></>}
            action={null}
            isLoading={false}
          />
        </Box>
        <img
          src={require("../../../assets/imgs/vs.png")}
          alt="versus"
          width={"64rem"}
        />
        <Box className="w-1/2 flex flex-col bg-white p-5 rounded-lg gap-2">
          <Typography variant="h6">
            Let's meet you're opponent trainer
          </Typography>
          <PokemonTable
            data={opponentPokemonList}
            icon={<></>}
            action={null}
            isLoading={isOpponentPokemonGenerating}
          />
          <Button
            disabled={myGenerations.length === 0 || isOpponentPokemonGenerating}
            onClick={generateOpponentPokemon}
            style={{
              background:
                myGenerations.length === 0 || isOpponentPokemonGenerating
                  ? green[100]
                  : green[600],
              color: "white",
              borderRadius: 10,
            }}
            className={`${
              myGenerations.length > 0 &&
              !isOpponentPokemonGenerating &&
              "animate-pulse"
            } hover:animate-none`}
            startIcon={<SaveRoundedIcon />}
            variant="contained"
            size="large"
          >
            Generate opponent team
          </Button>
        </Box>
      </div>
      <img
        src={require("../../../assets/imgs/Pokemon_Trainer_Female.png")}
        alt="Female-Pokemon-trainer"
        width={"198rem"}
      />
      <CustomSnackBar
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
        message="Opponent pokémon team generated"
      />
    </div>
  );
};

export default MyTeamSelection;
