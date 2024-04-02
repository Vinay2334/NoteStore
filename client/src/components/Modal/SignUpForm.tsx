import { useAppDispatch } from "@/redux/hooks";
import { setLoginView } from "@/redux/slices/modalSlice";
import { useAppSelector } from "@/redux/store";
import {
  Box,
  Button,
  Stack,
  TextField as BaseTextField,
  Typography,
  styled,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { MuiOtpInput } from "mui-one-time-password-input";
import { setOpenAlert } from "@/redux/slices/alertSlice";
import { apiConnector } from "@/services/apiconnector";
import { user_endpoints } from "@/services/api";
import { registerUser } from "@/services/operations/userApi";
import { registerUserInterface } from "@/typings";
const { SEND_OTP } = user_endpoints;

type Props = {};

function SignUpForm({}: Props) {
  // const [profilePicPreview, setProfilePicPreview] = useState<
  //   string | undefined
  // >(undefined);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const { view } = useAppSelector((state) => state.modalReducer);
  const form = useForm<registerUserInterface>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      otp: "",
    },
  });
  const { register, handleSubmit, formState, watch, setValue } = form;
  const { errors } = formState;

  const switchtoLogin = () => {
    dispatch(setLoginView());
  };

  const validateEmail = async (email: string) => {
    // Email validation logic goes here
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleSendOTP = async () => {
    const isValid = await validateEmail(watch("email"));
    if (!isValid) {
      dispatch(
        setOpenAlert({ message: "Email address invalid", severe: "warning" })
      );
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiConnector("POST", SEND_OTP, {
        email: watch("email"),
      });
      dispatch(
        setOpenAlert({ message: "Otp Sent successfully", severe: "success" })
      );
      setShowOtpForm(true);
    } catch (error: any) {
      console.log("SEND OTP ERROR.........", error);
      if (error?.response?.data?.error) {
        dispatch(
          setOpenAlert({
            message: `${error.response.data.error}`,
            severe: "error",
          })
        );
      } else {
        dispatch(
          setOpenAlert({ message: "Internal server error", severe: "error" })
        );
      }
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: registerUserInterface) => {
    try {
      if (!data.otp) {
        dispatch(
          setOpenAlert({ message: "OTP not provided", severe: "error" })
        );
        return;
      }
      await registerUser(data);
      dispatch(
        setOpenAlert({
          message: "User registered successfully",
          severe: "success",
        })
      );
      dispatch(setLoginView());
    } catch (error: any) {
      console.log("Sign in submit error", error);
      dispatch(
        setOpenAlert({
          message: `${error?.response.data.errors[0].detail}`,
          severe: "error",
        }) 
      );
    }
  };
  // const handleProfilePicSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     // Set the file to the form state
  //     setValue("profile_pic", file);
  //     // Create temporary URL for the image and store it in component state for preview
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfilePicPreview(imageUrl);
  //   }
  // };
  return (
    <React.Fragment>
      <Typography variant="h5" mb={3}>
        {view}
      </Typography>
      <form
        style={{ width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <Stack gap={3} alignItems="center">
          <TextField
            label="Username"
            type="text"
            required
            {...register("name", {
              required: "name is required",
              validate: {
                checkname: (v) =>
                  v.toString().length >= 4 ||
                  "name should atleast have 4 characters",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Password"
            type="password"
            required
            {...register("password", {
              required: "Password is required",
              validate: {
                checkPassword: (v) =>
                  v.toString().length >= 6 ||
                  "Password should atleast have 6 digits",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            type="password"
            required
            {...register("confirm_password", {
              required: "Password is required",
              validate: {
                checkPassword: (v: string) =>
                  v === watch("password") || "Passwords do not match.",
              },
            })}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
          <Box display="flex" width="100%">
            <TextField
              label="Email"
              type="email"
              required
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address invalid!",
                },
                // validate: {
                //   // Custom validation function for email format
                //   isValidEmail: (value) =>
                //     validateEmail(value) || "Invalid email address",
                // },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button size="small" onClick={handleSendOTP}>
              {isLoading ? <CircularProgress /> : "Send OTP"}
            </Button>
          </Box>
          {/* <Box display="flex" alignItems="center" width="100%">
            <label
              htmlFor="profile_picture_input"
              style={{ cursor: "pointer", marginLeft: "8px", width: "100%" }}
            >
              <Button variant="contained" component="span" sx={{width:'70%'}}>
                Upload Profile Picture
              </Button>
            </label>
            <input
              type="file"
              id="profile_picture_input"
              name="profile_picture"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePicSubmit}
            />
            {profilePicPreview && (
              <Image
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
                alt="Profile Pic"
                src={profilePicPreview}
              ></Image>
            )}
          </Box> */}
          {showOtpForm && (
            <MuiOtpInput
              autoFocus
              TextFieldsProps={{ placeholder: "-" }}
              validateChar={(value) => /^\d*$/.test(value)}
              width={{ sm: "60%", md: "70%", xs: "100%" }}
              value={watch("otp")}
              onChange={(otp) => {
                setValue("otp", otp);
              }}
            />
          )}
          <Button
            sx={{ width: "70%" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            SignUp
          </Button>
          <Box display="flex">
            <Typography sx={{ color: "gray", mr: "8px" }}>
              Already have an account?{" "}
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                color: blue[500],
                fontWeight: "700",
                "&:hover": { color: blue[700] },
              }}
              onClick={switchtoLogin}
            >
              LogIn
            </Typography>
          </Box>
        </Stack>
      </form>
    </React.Fragment>
  );
}

const TextField = styled(BaseTextField)(
  ({}) => `
      width: 100%;
    `
);

export default SignUpForm;
