import { getUser, loginUser } from "@/services/operations/userApi";
import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { setOpenAlert } from "./alertSlice";
import { userInterface } from "@/typings";

type InitialState={
  user: userInterface,
  loading: boolean,
  error: SerializedError | string,
}

const initialState = {
  loading: false,
  error: "",
  user: {
    email: "",
    username: "",
    college_name: null,
    profile_pic: null,
  } as userInterface
} as InitialState;

export const userProfile = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    }),
      builder.addCase(getUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const {  } = userProfile.actions;
export default userProfile.reducer;
