import { notes_endpoints } from "@/services/api";
import { apiConnector } from "@/services/apiconnector";
import { createAsyncThunk } from "@reduxjs/toolkit";
const { GET_ALL_NOTES_API, GET_ALL_SUBJECTS_API, GET_ALL_COURSES_API, GET_ALL_USER_DOCS_API } =
  notes_endpoints;

export const fetchAllDocs = createAsyncThunk(
  "fetchAllDocs",
  async (queryParams: Object | null, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_NOTES_API,
        null,
        undefined,
        queryParams
      );
      return response.data;
    } catch (error: any) {
      console.log("fetch_all_docs API ERROR............", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllSubjects = createAsyncThunk(
  "fetchAllSubjects",
  async (_, { rejectWithValue }) => {
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector("GET", GET_ALL_COURSES_API);
      return response.data.results;
    } catch (error: any) {
      console.log("fetch_all_courses API ERROR..................", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDocs = createAsyncThunk(
  "fetchUserDocs",
  async (token:string | undefined , { rejectWithValue }) => {
    console.log(token);
    try {
      const headers = {
        Authorization: `token ${token}`
      };
      console.log('nice');
      const response = await apiConnector("GET", GET_ALL_USER_DOCS_API, null, headers);
      console.log('fetchUser', response.data);
      return response.data;
    } catch (error: any) {
      console.log("fetch_user_docs API ERROR............", error);
      return rejectWithValue(error.response.data);
    }
  }
);
