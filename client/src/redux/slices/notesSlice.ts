import { fetchAllDocs, fetchUserDocs, uploadDocs } from "@/services/operations/notesApi";
import { docsInterface } from "@/typings";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean,
  docData: docsInterface | null,
};

const initialState: InitialState = {
  loading: false,
  docData: null,
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
      state.docData = action.payload;
    })
    builder.addCase(fetchAllDocs.rejected, (state, action) => {
      state.loading = false;
    })
    builder.addCase(fetchUserDocs.pending, (state, action) => {
      state.loading= true;
    })
    builder.addCase(fetchUserDocs.fulfilled, (state, action) => {
      state.loading= false;
      state.docData= action.payload;
    })
    builder.addCase(fetchUserDocs.rejected, (state, action) => {
      state.loading= false;
    })
    builder.addCase(uploadDocs.pending, (state, action) => {
      state.loading= true;
    })
    builder.addCase(uploadDocs.fulfilled, (state, action) => {
      state.loading= false;
    })
    builder.addCase(uploadDocs.rejected, (state, action) => {
      state.loading= false;
    })
  }
});

export const { } = notes.actions;
export default notes.reducer;