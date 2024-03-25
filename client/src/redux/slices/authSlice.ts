import { loginUser } from "@/services/operations/userApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setOpenAlert } from "./alertSlice";
type InitialState = {
  loading: boolean;
  token: string;
  error: any;
};

const initialState = {
  loading: false,
  token: "",
  error: "",
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
    }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setLoading, setToken } = auth.actions;
export default auth.reducer;
