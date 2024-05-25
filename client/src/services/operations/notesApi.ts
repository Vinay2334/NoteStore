import { setOpenAlert } from "@/redux/slices/alertSlice";
import { notes_endpoints } from "@/services/api";
import { apiConnector } from "@/services/apiconnector";
import {
  docsInterface,
  docsItemInterface,
  uploadFormInterface,
} from "@/typings";
import errorHandler from "@/utils/errorHandler";
import { Action, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import io from "socket.io-client";
const {
  GET_ALL_NOTES_API,
  GET_ALL_SUBJECTS_API,
  GET_ALL_COURSES_API,
  MANAGE_DOCS_API,
} = notes_endpoints;

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
  async (token: string | undefined, { rejectWithValue, dispatch }) => {
    try {
      const headers = {
        Authorization: `token ${token}`,
      };
      const response = await apiConnector(
        "GET",
        MANAGE_DOCS_API,
        null,
        headers
      );
      return response.data;
    } catch (error: any) {
      console.log("fetch_user_docs API ERROR............", error);
      dispatch(
        setOpenAlert({
          message: `${errorHandler(error.response.data)}`,
          severe: "error",
        })
      );
    }
  }
);

export const uploadDocs = createAsyncThunk(
  "uploadDocs",
  async (
    args: { data: FormData; token: string | undefined; setProgressData: any },
    { rejectWithValue, dispatch }
  ) => {
    console.log("upload");
    const { data, token, setProgressData } = args;
    const headers = {
      Authorization: `token ${token}`,
    };
    try {
      const socket = new WebSocket(
        `ws://${process.env.NEXT_PUBLIC_SERVER_NAME}/ws/upload_progress/?token=${token}`
      );

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };
      // Event handler for receiving messages
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data)
        setProgressData({progress: data.percentage, uploaded: data.uploaded, total_size: data.totalSize});
      };
      const response = await apiConnector(
        "POST",
        MANAGE_DOCS_API,
        data,
        headers
      );
      dispatch(
        setOpenAlert({
          message: `Doc Uploaded successfully`,
          severe: "success",
        })
      );
      return response.data as docsItemInterface;
    } catch (error: any) {
      console.log("UPLOADdOCS API ERROR............", error);
      dispatch(
        setOpenAlert({
          message: `${errorHandler(error.response.data)}`,
          severe: "error",
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);
