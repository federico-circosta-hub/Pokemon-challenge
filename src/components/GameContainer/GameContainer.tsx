import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BeginAdventure from "./Modals/BeginAdventure";
import TrainerDetails from "./TrainerDetails/TrainerDetails";
import MyTeamSelection from "./MyTeamSelection/MyTeamSelection";
import OpponentTeamSelection from "./OpponentTeamSelection/OpponentTeamSelection";
import { useDispatch, useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import { resetPokemonChallengeSlice } from "../../redux/pokemonChallengeSlice";

const steps = [
  "Pokémon trainer details",
  "Pokémon team selection",
  "Opponent team selection",
];

const GameContainer = () => {
  const dispatch = useDispatch();
  const trainerDataRedux = useSelector(
    (state: any) => state.pokemonChallenge.trainer
  );
  const myPokemonListRedux = useSelector(
    (state: any) => state.pokemonChallenge.myPokemonList
  );
  const [activeStep, setActiveStep] = useState(0);
  const [opponentPokemonList, setOpponentPokemonList] = useState<
    pokemonListElement[]
  >([]);
  const [startAdventure, setStartAdventure] = useState({
    loading: false,
    done: false,
  });

  useEffect(() => {
    if (startAdventure.loading) {
      setTimeout(() => {
        setStartAdventure({ loading: false, done: true });
      }, 5000);
    }
  }, [startAdventure]);

  const handleNext = () => {
    if (!canContinue())
      return alert("Please complete the current step before proceeding.");
    if (activeStep === steps.length - 1)
      return setStartAdventure({ loading: true, done: false });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const canContinue = (): boolean => {
    switch (activeStep) {
      case 0:
        return Object.values(trainerDataRedux).every((e: any) => e);
      case 1:
        return myPokemonListRedux.length === 7;
      case 2:
        return opponentPokemonList.length === 4;
      default:
        return false;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    dispatch(resetPokemonChallengeSlice());
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-8 rounded-3xl shadow-md bg-slate-100">
      <div className="w-3/5 mb-8">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="w-4/5 h-4/5 flex flex-col items-center bg-sky-50 p-4 rounded-xl shadow-lg shadow-sky-200">
        <Typography
          className="w-full flex justify-center"
          variant="h5"
          fontWeight={600}
          color="#172554"
        >
          {steps[activeStep]}
        </Typography>
        {activeStep === 0 && <TrainerDetails />}
        {activeStep === 1 && <MyTeamSelection />}
        {activeStep === 2 && (
          <OpponentTeamSelection
            opponentPokemonList={opponentPokemonList}
            setOpponentPokemonList={setOpponentPokemonList}
          />
        )}
      </div>
      <div className="w-4/5 flex flex-col items-center gap-12">
        <div className="w-4/5 justify-between flex bg-sky-50 p-8 rounded-b-xl shadow-lg shadow-sky-200">
          <Button
            className="hover:animate-pulse"
            style={{
              background: activeStep === 0 ? "whitesmoke" : "white",
              color: activeStep === 0 ? "grey" : "black",
              borderRadius: 10,
            }}
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            size="large"
          >
            Back
          </Button>
          <Button
            className="hover:animate-pulse"
            style={{
              background: red["800"],
              color: "white",
              borderRadius: 10,
            }}
            variant="contained"
            onClick={handleReset}
            size="small"
          >
            Reset
          </Button>
          <Button
            className="hover:animate-pulse"
            style={{
              background: "#172554",
              color: "white",
              borderRadius: 10,
            }}
            onClick={handleNext}
            variant="contained"
            size="large"
          >
            {activeStep === steps.length - 1 ? "Start your adventure!" : "Next"}
          </Button>
        </div>
      </div>
      {(startAdventure.loading || startAdventure.done) && (
        <BeginAdventure
          startAdventure={startAdventure}
          setStartAdventure={setStartAdventure}
        />
      )}
    </div>
  );
};

export default GameContainer;
