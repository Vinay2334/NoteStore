import { loginUser } from "@/services/operations/userApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setOpenAlert } from "./alertSlice";
import Cookies from 'js-cookie';
type InitialState = {
  loading: boolean;
  token: string;
  error: any;
};

const initialState = {
  loading: false,
  token: "",
  error: Cookies.get("auth_token") ? Cookies.get("auth_token") : "",
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = `${action.payload.token}`;
      state.loading = false;
    }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = "",
        state.error = action.error;
      });
  },
});

export const {  } = auth.actions;
export default auth.reducer;
