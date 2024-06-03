"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenAlert } from "@/redux/slices/alertSlice";
import { useAppSelector } from "@/redux/store";
import { fetchUserDocs } from "@/services/operations/notesApi";
import errorHandler from "@/utils/errorHandler";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRouter } from "next/navigation";
import authRoutes from "@/components/authRoutes";

type Props = {};

function Uploads({}: Props) {
  const dispatch = useAppDispatch();
  const { docData } = useAppSelector((state) => state.notesReducer);
  const token = Cookies.get("auth_token");
  const router = useRouter();
  console.log(Cookies.get("auth_token"));
  useEffect(() => {
    const fetchDocsFunc = async () => {
      await dispatch(fetchUserDocs(token)).unwrap();
    };
    fetchDocsFunc();
  }, [dispatch, token]);

  return (
    <Box marginTop="7rem" display="flex" flexDirection="column" gap="4rem">
      <Button
        sx={{ margin: "auto" }}
        variant="contained"
        onClick={() => router.push("/uploads/uploadfile")}
      >
        <FileUploadIcon />
        Upload file
      </Button>
      <Box padding={{ md: "0 4rem 0 4rem", xs: "0px" }}>
        <Typography
          fontSize={{
            xs: "2rem",
            sm: "3rem",
          }}
          marginBottom={4}
        >
          Your Uploads
        </Typography>
        <Grid
          overflow="hidden"
          container
          rowSpacing={{ xs: "0", sm: "2rem" }}
          columnSpacing={{ xs: 0, sm: 2, md: 1 }}
        > 
          {docData?.results?.map((result, index) => (
            <Grid key={index} xs={6} sm={4} md={2.4}>
              <ProductCard doc={result} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default authRoutes(Uploads);
