import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { useAppSelector } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { setCloseAlert } from "@/redux/slices/alertSlice";

type Props = {};

function AppAlert({}: Props) {
  const dispatch = useAppDispatch();
  const { open, vertical, horizontal, severe, title, message, transition } =
    useAppSelector((state) => state.alertReducer);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      TransitionComponent={transition}
      autoHideDuration={5000}
      onClose={() => dispatch(setCloseAlert())}
      key={vertical + horizontal}
    >
      <Alert
        onClose={() => dispatch(setCloseAlert())}
        severity={severe}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AppAlert;
