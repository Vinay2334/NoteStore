import React from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import { handleClose } from "@/redux/slices/modalSlice";
import { useAppSelector } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import {
  Stack,
  styled,
  TextField as BaseTextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { DevTool } from "@hookform/devtools";
import { useTheme } from "@emotion/react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

type FormValues = {
  email: string;
  password: string;
};

function AuthModal() {
  const theme = useTheme()
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
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} alignItems="center">
        <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 3, right: 3 }}
          >
            <CloseIcon />
          </IconButton>
          {/*<DevTool control={control}/> */}
          {view=='Login' && <LoginForm/>}
          {view=='SignUp' && <SignUpForm/>}
        </Stack>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    lg: "30%",
    md: "60%",
    xs: "100%",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default AuthModal;