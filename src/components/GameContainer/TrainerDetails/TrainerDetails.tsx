import React, { useState } from "react";
import { TextField, Box, Typography, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useGetPokemonTypesQuery } from "../../../redux/api/pokemonChallengeApi";
import { green } from "@mui/material/colors";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { updateTrainer } from "../../../redux/pokemonChallengeSlice";
import CustomSnackBar from "../../Miscellaneus/CustomSnackBar";

type pokemonType = {
  name: string;
  url: string;
};

const TrainerDetails = () => {
  const dispatch = useDispatch();
  const trainerDataRedux = useSelector(
    (state: any) => state.pokemonChallenge.trainer
  );
  const [formData, setFormData] = useState<trainerData>(trainerDataRedux);
  const [modifiedForm, setModifiedForm] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  const { data: pokemonTypes } = useGetPokemonTypesQuery(undefined);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedForm(true);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const saveTrainerInfo = () => {
    dispatch(updateTrainer(formData));
    setShowSnackBar(true);
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-8">
      <img
        src={require("../../../assets/imgs/Pokemon_Trainer_Male.png")}
        alt="Pokemon-trainer"
        width={"228rem"}
      />
      <Box
        className="flex flex-col bg-white p-5 rounded-lg gap-2"
        component="form"
        autoComplete="off"
      >
        <Typography variant="h6" fontWeight={600}>
          So, you want to become a Pokémon trainer, great!
        </Typography>
        <Typography variant="h6">Let's begin with your information</Typography>
        <TextField
          name="playerName"
          label="Player Name"
          variant="outlined"
          margin="normal"
          value={formData.playerName}
          onChange={handleInputChange}
        />
        <TextField
          name="teamName"
          label="Team Name"
          variant="outlined"
          margin="normal"
          value={formData.teamName}
          onChange={handleInputChange}
        />
        <TextField
          name="favoritePokemonType"
          label="Favorite Pokémon Type"
          variant="outlined"
          margin="normal"
          value={formData.favoritePokemonType}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="" key="none">
            None
          </MenuItem>
          {pokemonTypes?.results?.map((e: pokemonType, index: number) => (
            <MenuItem value={e.name} key={index}>
              {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
            </MenuItem>
          ))}
        </TextField>
        <Button
          disabled={!modifiedForm}
          onClick={saveTrainerInfo}
          style={{
            background: modifiedForm ? green[600] : green[100],
            color: "white",
            borderRadius: 10,
          }}
          startIcon={<SaveRoundedIcon />}
          variant="contained"
          size="large"
        >
          Save info
        </Button>
      </Box>
      <CustomSnackBar
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
        message="Trainer info updated"
      />
    </div>
  );
};

export default TrainerDetails;
