import { ComponentType } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor, Slide } from "@mui/material";
import { SnackbarOrigin } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export interface AlertState {
  open: boolean;
  vertical: SnackbarOrigin["vertical"];
  horizontal: SnackbarOrigin["horizontal"];
  severe: AlertColor | string;
  title: string;
  message: string;
  transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
}

const initialState: AlertState = {
  open: false,
  vertical: "top",
  horizontal: "center",
  severe: "",
  title: "",
  message: "",
  transition: Slide,
};
export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenAlert(state, action: PayloadAction<Partial<AlertState>>) {
      return { ...state, open: true, ...action.payload };
    },
    setCloseAlert() {
      return { ...initialState };
    },
  },
});

export const { setOpenAlert, setCloseAlert } = modal.actions;
export default modal.reducer;
