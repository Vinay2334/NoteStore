import { fetchAllCourses } from "@/services/operations/notesApi";
import { itemInterface } from "@/typings";
import { createSlice } from "@reduxjs/toolkit";

type initialCourseState = {
  loading: boolean;
  error: any;
  courses: Array<itemInterface>
};

const initialState = {
  loading: false,
  error: "",
  courses: [],
} as initialCourseState;

export const courses = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCourses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.courses = action.payload;
    }),
      builder.addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default courses.reducer;