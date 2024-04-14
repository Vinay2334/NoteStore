"use client";
import {
  Box,
  Container,
  Paper as BasePaper,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {};

function ProductCard({}: Props) {
  return (
    <Paper elevation={2}>
      <Box
        position="absolute"
        right="2px"
        top="2px"
        width={40}
        height={40}
        borderRadius="50%"
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FavoriteIcon sx={{ color: "red" }} />
      </Box>
      <Box
        display="flex"
        height="65%"
        alignItems="center"
        justifyContent="center"
      >
        <Img src="book1.jpeg" alt="" />
      </Box>
      <Stack marginLeft={3} height="40%" width="100%">
        <Typography fontSize="1.1rem" fontWeight={700}>
          New Title
        </Typography>
        <Typography fontSize={15}>Subject: english</Typography>
        <Rating
          precision={0.5}
          defaultValue={2.5}
          sx={{ fontSize: "1.2rem" }}
        />
        <Typography fontSize={15} color="rgb(205,140,87)">
          Contributor: name
        </Typography>
        <Typography fontSize={12}>Upload Date: 12 Mar 2020</Typography>
        <Typography fontSize={12}>Size: 12M</Typography>
      </Stack>
    </Paper>
  );
}

const Paper = styled(BasePaper)({
  width: "100%",
  position: "relative",
  height: "25rem",
  cursor: "pointer",
  "&:hover": {
    boxShadow: '0 8px 11px rgba(33,33,33,.2)'
  }
});

const Img = styled("img")({
  height: "90%",
  width: "60%",
  boxShadow: "5px 8px 10px rgba(0, 0, 0, 0.2) ",
});

export default ProductCard;
