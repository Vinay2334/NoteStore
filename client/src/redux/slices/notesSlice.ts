import { fetchAllDocs, fetchUserDocs } from "@/services/operations/notesApi";
import { docsInterface } from "@/typings";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  loading: Boolean,
  results: docsInterface | null,
};

const initialState: InitialState = {
  loading: false,
  results: null,
};

export const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDocs.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchAllDocs.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
    })
    builder.addCase(fetchAllDocs.rejected, (state, action) => {
      state.loading = false;
    })
    builder.addCase(fetchUserDocs.pending, (state, action) => {
      state.loading= true;
    })
    builder.addCase(fetchUserDocs.fulfilled, (state, action) => {
      state.loading= false;
      state.results= action.payload;
    })
    builder.addCase(fetchUserDocs.rejected, (state, action) => {
      state.loading= false;
    })
  }
});

export const { } = notes.actions;
export default notes.reducer;