import React from "react";
import { Typography } from "@mui/material";

const Topbar = () => {
  return (
    <div className="w-full h-20 flex items-center p-5 gap-5 bg-blue-950 shadow-md z-10">
      <img
        src={require("../../assets/imgs/contentwise-logo.png")}
        alt="Contentwise Logo"
        className="w-80"
      />
      <Typography variant="h5" color="white">
        Pokémon Challenge
      </Typography>
    </div>
  );
};

export default Topbar;
