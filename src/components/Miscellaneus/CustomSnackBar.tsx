import React from "react";
import { Alert, Slide, Snackbar } from "@mui/material";

const CustomSnackBar = ({
  showSnackBar,
  setShowSnackBar,
  message,
}: {
  showSnackBar: boolean;
  setShowSnackBar: Function;
  message: string;
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={showSnackBar}
      onClose={() => setShowSnackBar(false)}
      autoHideDuration={3000}
      TransitionComponent={Slide}
      transitionDuration={400}
    >
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
