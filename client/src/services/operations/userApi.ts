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
import Cookies from "js-cookie";
import { handleClose } from "@/redux/slices/modalSlice";
import errorHandler from "@/utils/errorHandler";

const { REGISTER_USER, SEND_OTP, LOGIN_USER, GET_USER } = user_endpoints;

export const registerUser = async (userdata: registerUserInterface) => {
  let result;
  try {
    const response = await apiConnector("POST", REGISTER_USER, userdata, {
      "Content-Type": "multipart/form-data",
    });
    result = response.data;
    return result
  } catch (error) {
    console.log("REGISTER_USER............", error);
    throw error;
  }
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userdata: loginUserInterface, { rejectWithValue }) => {
    try {
      const response = await apiConnector("POST", LOGIN_USER, userdata);
      Cookies.set("auth_token", response.data.token);
      return response.data;
    } catch (error: any) {
      console.log("LOGIN USER ERROR.............", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (token: string | undefined, { rejectWithValue, dispatch }) => {
    const headers = {
      Authorization: `token ${token}`,
    };
    try {
      const response = await apiConnector("GET", GET_USER, null, headers);
      dispatch(
        setOpenAlert({ message: `Logged in Successfully`, severe: "success" })
      );
      dispatch(handleClose());
      return response.data;
    } catch (error: any) {
      console.log("GET USER API ERROR.............", error);
      dispatch(
        setOpenAlert({
          message: `${errorHandler(error.response.data)}`,
          severe: "error",
        })
      );
    }
  }
);
