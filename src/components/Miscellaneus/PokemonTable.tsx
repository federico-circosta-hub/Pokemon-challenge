import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import PokemonDetail from "../GameContainer/Modals/PokemonDetail";

const PokemonTable = ({
  data,
  icon,
  action,
  isLoading,
}: {
  data: pokemonListElement[];
  icon: React.ReactElement;
  action: Function | null;
  isLoading: boolean;
}) => {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string>("");
  const { favoritePokemonType } = useSelector(
    (state: any) => state.pokemonChallenge.trainer
  );
  return (
    <div className="w-full flex h-96 justify-center p-1 gap-2 overflow-auto bg-gray-100">
      {isLoading ? (
        <>
          <CircularProgress
            size={50}
            style={{ color: "#172554", margin: 12 }}
          />
        </>
      ) : data.length === 0 ? (
        <Typography variant="body2" color="grey">
          Ouch, there are no Pokémon here
        </Typography>
      ) : (
        <List className="w-full">
          {data
            ?.sort((p1, p2) => {
              const isFavorite1 = p1.type.includes(favoritePokemonType);
              const isFavorite2 = p2.type.includes(favoritePokemonType);
              if (isFavorite1 !== isFavorite2) {
                return isFavorite1 ? -1 : 1;
              }
              return p1.name.localeCompare(p2.name);
            })
            ?.map((pokemon: pokemonListElement, index: number) => (
              <ListItemButton
                sx={{
                  padding: "2px",
                  paddingX: 2,
                  borderRadius: 5,
                  display: "flex",
                }}
                key={index}
                onClick={() => {
                  setSelectedPokemonName(pokemon.name);
                }}
              >
                <ListItemAvatar>
                  {pokemon.img ? (
                    <Avatar
                      alt={pokemon.name}
                      src={pokemon.img}
                      style={{ width: 50, height: 50, flex: 1 }}
                    />
                  ) : (
                    <Avatar>{pokemon?.name[0]}</Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  style={{ flex: 3 }}
                  primary={
                    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                  }
                />
                <ListItemText
                  style={{ flex: 3 }}
                  primary={pokemon.type.toString().replace(",", ", ")}
                />
                {action && (
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      action(pokemon);
                    }}
                    size="small"
                  >
                    {icon}
                  </IconButton>
                )}
              </ListItemButton>
            ))}
        </List>
      )}
      {!!selectedPokemonName && (
        <PokemonDetail
          pokemonName={selectedPokemonName}
          showPokemonDetail={!!selectedPokemonName}
          setSelectedPokemonName={setSelectedPokemonName}
        />
      )}
    </div>
  );
};

export default PokemonTable;
