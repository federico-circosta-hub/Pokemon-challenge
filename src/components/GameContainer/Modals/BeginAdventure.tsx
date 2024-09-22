import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
const BeginAdventure = ({
  startAdventure,
  setStartAdventure,
}: {
  startAdventure: { loading: boolean; done: boolean };
  setStartAdventure: Function;
}) => {
  const { loading, done } = startAdventure;
  return (
    <div className="w-full h-full absolute z-20">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading || done}
        onClick={() => {
          if (done) setStartAdventure({ loading: false, done: false });
        }}
      >
        <div className="w-1/2 h-1/3 flex justify-center items-center gap-8 p-4 bg-green-100 rounded-md shadow-lg shadow-yellow-400">
          {loading ? (
            <>
              <img
                src={require("../../../assets/imgs/pikachu_flipped.png")}
                alt="Pikachu"
                className="w-24 animate-bounce"
              />
              <div className="flex flex-col justify-center items-center gap-4">
                <Typography variant="h4" color="success">
                  Well done
                </Typography>
                <Typography variant="h6" color="success">
                  Your battle starts shortly!
                </Typography>
                <CircularProgress color="success" />
              </div>
              <img
                src={require("../../../assets/imgs/pikachu.png")}
                alt="Pikachu"
                className="w-24 animate-bounce"
              />
            </>
          ) : done ? (
            <div className="flex flex-col">
              <Typography variant="h4" color="success">
                I'm glad you got this far!
              </Typography>
              <Typography variant="h6" color="success">
                Click to dismiss
              </Typography>
            </div>
          ) : null}
        </div>
      </Backdrop>
    </div>
  );
};

export default BeginAdventure;
