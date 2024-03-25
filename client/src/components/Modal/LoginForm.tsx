import { useAppDispatch } from "@/redux/hooks";
import { handleClose, setSignUpView } from "@/redux/slices/modalSlice";
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
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

type Props = {};

function LoginForm({}: Props) {
  const { open, view } = useAppSelector((state) => state.modalReducer);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    dispatch(handleClose());
  };
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  const switchToSignUp = () => {
    dispatch(setSignUpView())
  }
  return (
    <React.Fragment>
      <Typography variant="h5" mb={3}>
        {view}
      </Typography>
      <form
        style={{ width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack gap={3} alignItems="center">
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
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            required
            {...register("password", {
              required: "Password is required",
              validate: {
                checkPhn: (v) =>
                  v.toString().length >= 6 ||
                  "Password should atleast have 6 digits",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            sx={{ width: "70%" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Box display="flex">
            <Typography sx={{ color: "gray", mr: "8px" }}>
              New Here?{" "}
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                color: blue[500],
                fontWeight: "700",
                "&:hover": { color: blue[700] },
              }}
              onClick={switchToSignUp}
            >
              SignUp
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

export default LoginForm;
