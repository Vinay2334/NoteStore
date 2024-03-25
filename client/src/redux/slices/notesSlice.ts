import { createSlice } from "@reduxjs/toolkit";

type ResultState = {
  id: Number;
  title: String;
  url: String;
  subject: String;
  category: String;
  file_size: String;
  contributor: String;
  date_created: String;
  likes_count: Number;
  avg_rating: Number;
  tags: Array<Object>;
};

type InitialState = {
  count: Number;
  next: Number;
  previous: Number;
  results: Array<ResultState>;
};

const initialState: InitialState = {
  count: 0,
  next: 0,
  previous: 0,
  results: [],
};

export const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action) {
      state.results = action.payload.results;
    },
  },
});

export const { setNotes } = notes.actions;
export default notes.reducer;