import { setOpenAlert } from "@/redux/slices/alertSlice";
import { user_endpoints } from "../api";
import { apiConnector } from "../apiconnector";
import {
  loginUserInterface,
  registerUserInterface,
  userInterface,
} from "@/typings";
import { store } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { headers } from "next/headers";

const { REGISTER_USER, SEND_OTP, LOGIN_USER, GET_USER } = user_endpoints;

export const registerUser = async (userdata: registerUserInterface) => {
  let result;
  try {
    const response = await apiConnector("POST", REGISTER_USER, userdata, {
      "Content-Type": "multipart/form-data",
    });
    result = response.data;
  } catch (error) {
    console.log("REGISTER_USER............", error);
    throw error;
  }
  console.log(result);
  return result;
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userdata: loginUserInterface, { rejectWithValue }) => {
    try {
      const response = await apiConnector("POST", LOGIN_USER, userdata);
      return response.data;
    } catch (error: any) {
      console.log("LOGIN USER ERROR.............", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (token: string, { rejectWithValue }) => {
    const headers = {
      Authorization: `token ${token}`
    };
    try {
      const response = await apiConnector("GET", GET_USER, null, headers);
      return response.data;
    } catch (error: any) {
      console.log("GET USER API ERROR.............", error);
      return rejectWithValue(error.response.data);
    }
  }
);
