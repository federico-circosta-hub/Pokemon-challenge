import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Backdrop } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { green } from "@mui/material/colors";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PokemonTable from "../../Miscellaneus/PokemonTable";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useGetPokemonQuery } from "../../../redux/api/pokemonChallengeApi";
import { updateMyPokemonList } from "../../../redux/pokemonChallengeSlice";
import CustomSnackBar from "../../Miscellaneus/CustomSnackBar";

const pokemonListLimit = 1500;

const MyTeamSelection = () => {
  const dispatch = useDispatch();
  const myPokemonListRedux = useSelector(
    (state: any) => state.pokemonChallenge.myPokemonList
  );

  const [pokemonList, setPokemonList] = useState<pokemonListElement[]>([]);
  const [isPokemonListLoading, setIsPokemonListLoading] =
    useState<boolean>(true);
  const [myPokemonList, setMyPokemonList] = useState<pokemonListElement[]>([
    ...myPokemonListRedux,
  ]);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  const { data: pokemonData } = useGetPokemonQuery({
    limit: pokemonListLimit,
    offset: "0",
  });

  useEffect(() => {
    getAllPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonData?.results?.length, pokemonList?.length]);

  const getAllPokemon = async () => {
    setIsPokemonListLoading(true);
    if (pokemonData?.results.length > 0 && pokemonList.length === 0) {
      const newData = await Promise.all(
        pokemonData.results.map(async (e: any) => {
          try {
            const rawData = await fetch(e.url);
            const data = await rawData.json();
            return {
              img: data.sprites.front_default,
              name: e.name,
              type: data.types.map((type: any) => type.type.name),
            };
          } catch (error) {
            //ci riprovo una seconda volta
            try {
              const rawData = await fetch(e.url);
              const data = await rawData.json();
              return {
                img: data.sprites.front_default,
                name: e.name,
                type: data.types.map((type: any) => type.type.name),
              };
            } catch (error) {
              console.error("Errore nella chiamata a getPokemonByName:", error);
              return null;
            }
          }
        })
      );
      const filteredData = newData.filter((pokemon) => pokemon !== null);
      setPokemonList(filteredData);
    }
    setIsPokemonListLoading(false);
  };

  const saveTeam = () => {
    dispatch(updateMyPokemonList(myPokemonList));
    setShowSnackBar(true);
  };
  const addPokemonToMyTeam = (pokemon: pokemonListElement) => {
    if (myPokemonList.length === 7) return;
    const myPokemonListCopy = [...myPokemonList];
    myPokemonListCopy.push(pokemon);
    setMyPokemonList(myPokemonListCopy);
  };

  const removePokemonFromMyTeam = (pokemon: pokemonListElement) => {
    const updatedList = myPokemonList.filter((p) => p.name !== pokemon.name);
    setMyPokemonList(updatedList);
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
          <Backdrop
            style={{
              position: "absolute",
              zIndex: 10,
              borderRadius: 10,
              background: "#d3d3d369",
            }}
            open={myPokemonList.length === 7 && pokemonList.length > 0}
          >
            <CheckCircleOutlineRoundedIcon
              style={{ fontSize: 125, zIndex: 20, color: "#172554" }}
            />
          </Backdrop>
          <Typography variant="h6" fontWeight={600}>
            Now, the most exciting part!
          </Typography>

          <PokemonTable
            data={pokemonList}
            icon={<ControlPointIcon />}
            action={addPokemonToMyTeam}
            isLoading={isPokemonListLoading}
          />
        </Box>
        <ArrowForwardIcon />
        <Box className="w-1/2 flex flex-col bg-white p-5 rounded-lg gap-2">
          <Typography variant="h6">Select 7 Pokémon for your team</Typography>
          <PokemonTable
            data={myPokemonList}
            icon={<DeleteIcon />}
            action={removePokemonFromMyTeam}
            isLoading={false}
          />
          <Button
            disabled={myPokemonList.length !== 7}
            onClick={saveTeam}
            style={{
              background: myPokemonList.length !== 7 ? green[100] : green[600],
              color: "white",
              borderRadius: 10,
            }}
            className={`${
              myPokemonList.length === 7 && "animate-pulse"
            } hover:animate-none`}
            startIcon={<SaveRoundedIcon />}
            variant="contained"
            size="large"
          >
            Save team
          </Button>
        </Box>
      </div>
      <CustomSnackBar
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
        message="Pokémon team updated"
      />
    </div>
  );
};

export default MyTeamSelection;
