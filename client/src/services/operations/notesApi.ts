import { notes_endpoints } from "@/services/api";
import { apiConnector } from "@/services/apiconnector";
import { createAsyncThunk } from "@reduxjs/toolkit";
const { GET_ALL_NOTES_API, GET_ALL_SUBJECTS_API, GET_ALL_COURSES_API } = notes_endpoints;

export const fetchAllNotes = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_NOTES_API);
    result = response.data.results;
  } catch (error) {
    console.log("fetch_all_notes API ERROR............", error);
  }
  return result;
};

export const fetchAllSubjects = createAsyncThunk(
  "fetchAllSubjects",
  async (_,{rejectWithValue}) => {
    try {
      const response = await apiConnector("GET", GET_ALL_SUBJECTS_API);
      return response.data.results;
    } catch (error: any) {
      console.log("fetch_all_subjects API ERROR..................", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCourses = createAsyncThunk(
  "fetchAllCourses",
  async (_,{rejectWithValue}) => {
    try {
      const response = await apiConnector("GET", GET_ALL_COURSES_API);
      return response.data.results;
    } catch (error: any) {
      console.log("fetch_all_courses API ERROR..................", error);
      return rejectWithValue(error.response.data);
    }
  }
);