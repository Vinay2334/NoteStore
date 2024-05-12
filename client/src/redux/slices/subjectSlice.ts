import { fetchAllSubjects } from "@/services/operations/notesApi";
import { itemInterface } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialSubjectState = {
  loading: boolean;
  error: any;
  subjects: Array<itemInterface>
};

const initialState = {
  loading: false,
  error: "",
  subjects: [],
} as initialSubjectState;

export const subjects = createSlice({
  name: "subjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSubjects.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSubjects.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.subjects = action.payload;
    }),
      builder.addCase(fetchAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default subjects.reducer;