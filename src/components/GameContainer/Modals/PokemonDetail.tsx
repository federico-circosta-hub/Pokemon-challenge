import {
  Backdrop,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetPokemonByIdOrNameQuery,
  useGetPokemonSpeciesQuery,
} from "../../../redux/api/pokemonChallengeApi";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getColorFromUrl } from "../../../utils/color";

const PokemonDetail = ({
  pokemonName,
  showPokemonDetail,
  setSelectedPokemonName,
}: {
  pokemonName: string;
  showPokemonDetail: boolean;
  setSelectedPokemonName: Function;
}) => {
  const [bgColor, setBgColor] = useState<string>("white");
  const [list, setList] = useState<string[]>([]);
  const { data: speciesData, isLoading: isSpeciesLoading } =
    useGetPokemonSpeciesQuery(pokemonName);
  const { data: pokemonData, isLoading: isPokemonLoading } =
    useGetPokemonByIdOrNameQuery(pokemonName);
  const isInfoLoading = isPokemonLoading || isSpeciesLoading;

  useEffect(() => {
    if (pokemonData) bgSetter();
    // eslint-disable-next-line
  }, [pokemonData]);

  const bgSetter = async () => {
    const backgroundCol = await getColorFromUrl(
      pokemonData.sprites["front_default"]
    );
    setBgColor(backgroundCol);
  };

  return (
    <div className="w-full h-full absolute z-20">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={showPokemonDetail}
        onClick={() => setSelectedPokemonName(undefined)}
      >
        {isInfoLoading ? (
          <CircularProgress
            size={50}
            style={{ color: "#172554", margin: 12 }}
          />
        ) : (
          <>
            {/* <div className="flex">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
                  alt="pokemon image"
                  className="w-48"
                />
                <div></div>
              </div> */}
            <Card
              sx={{
                maxWidth: 1000,
                height: 500,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: bgColor,
                padding: 3,
                gap: 1,
                borderRadius: 8,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 300 }}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData?.id}.png`}
              />
              <CardContent className="flex flex-col overflow-y-auto">
                {list.length > 0 ? (
                  <div className="flex flex-col items-start">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setList([]);
                      }}
                      size="large"
                    >
                      {<ArrowBackIcon />}
                    </IconButton>
                    <div className="h-96 overflow-y-auto">
                      {list.map((e: string) => (
                        <li>
                          <Typography
                            variant="overline"
                            fontSize={14}
                            fontWeight={500}
                          >
                            {e}
                          </Typography>
                        </li>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={require("../../../assets/imgs/pokeball.png")}
                        alt="Pikachu"
                        className="w-8 h-8 animate-bounce"
                      />
                      <Typography variant="h3" fontWeight={700} component="div">
                        {pokemonData?.name}
                      </Typography>
                    </div>

                    <Typography
                      variant="overline"
                      fontSize={14}
                      fontWeight={500}
                    >
                      <b>types:</b>{" "}
                      {pokemonData?.types
                        ?.map((t: any) => t?.type?.name)
                        .toString()
                        .replace(",", ", ")}
                    </Typography>
                    <Typography
                      variant="overline"
                      fontSize={14}
                      fontWeight={500}
                    >
                      <b>habitat:</b> {speciesData?.habitat?.name}
                    </Typography>
                    <Typography
                      variant="overline"
                      fontSize={14}
                      fontWeight={500}
                    >
                      <b>generation:</b> {speciesData?.generation?.name}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        overflowX: "scroll",
                        whiteSpace: "nowrap",
                      }}
                      variant="overline"
                      fontSize={14}
                      fontWeight={500}
                    >
                      <b>list of moves:</b>{" "}
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          setList(
                            pokemonData?.moves?.map((m: any) => m?.move?.name)
                          );
                        }}
                        size="small"
                      >
                        {<OpenInNewIcon />}
                      </IconButton>
                    </Typography>
                    <Typography
                      variant="overline"
                      fontSize={14}
                      fontWeight={500}
                    >
                      <b>list of forms:</b>{" "}
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          setList(pokemonData?.forms?.map((f: any) => f?.name));
                        }}
                        size="small"
                      >
                        {<OpenInNewIcon />}
                      </IconButton>
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Backdrop>
    </div>
  );
};

export default PokemonDetail;
