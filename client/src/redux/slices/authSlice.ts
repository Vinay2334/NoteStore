import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
  loading: boolean;
  token: string;
};

const initialState = {
  loading: false,
  token: "",
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action){
      state.loading = action.payload;
    },
    setToken(state, action){
      state.token = action.payload;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(sendOtp.fulfilled, (state, action) => {
      
  //   })
  // }
});

export const {setLoading, setToken} = auth.actions
export default auth.reducer