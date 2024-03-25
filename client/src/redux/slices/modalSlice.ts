import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalView = "Login" | "SignUp";

export interface ModalState{
    open: boolean,
    view: ModalView,
}

const initialState: ModalState = {
    open: false,
    view: 'Login',
}
export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleOpen(state){
        state.open = true;
    },
    handleClose(state){
        state.open = false;
    },
    setLoginView(state){
        state.open = true;
        state.view = 'Login';
    },
    setSignUpView(state){
        state.open = true;
        state.view = 'SignUp';
    },
  },
});

export const {handleOpen, handleClose, setLoginView, setSignUpView} = modal.actions
export default modal.reducer