import { setOpenAlert } from "@/redux/slices/alertSlice";
import { user_endpoints } from "../api";
import { apiConnector } from "../apiconnector";
import { registerUserInterface, userInterface } from "@/typings";
import { store } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

const { REGISTER_USER, SEND_OTP } = user_endpoints;

export const registerUser = async(userdata: registerUserInterface) => {
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
}
