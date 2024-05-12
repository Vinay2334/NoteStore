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
import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import theme from "@/theme";
import { docsItemInterface } from "@/typings";
import { format } from "date-fns";

type Props = {
  doc: docsItemInterface;
};

function ProductCard({ doc }: Props) {
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
        <Img src={`${doc.thumbnail}`} alt="" />
      </Box>
      <Stack
        boxSizing="border-box"
        paddingLeft={{ sm: "2rem", xs: "0.7rem" }}
        height="40%"
        width="100%"
      >
        <Typography
          fontSize={{
            xs: "1rem",
            sm: "1.1rem",
          }}
          fontWeight={700}
          noWrap
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {doc.title}
        </Typography>
        <Typography
          fontSize={{
            xs: "0.9rem",
            sm: "0.7rem",
          }}
        >
          Subject: {doc.subject.sub_name}
        </Typography>
        <Rating
          precision={0.5}
          defaultValue={doc.avg_rating}
          sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
        />
        <Typography
          noWrap
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
          fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
          color="rgb(205,140,87)"
        >
          Contributor:
          {doc.contributor}
        </Typography>
        <Typography fontSize={{ xs: "0.7rem", sm: "0.9rem" }}>
          Upload Date:
          {format(doc.date_created, "dd/mm/yyyy")}
        </Typography>
        <Typography fontSize="0.7rem">Size: {doc.file_size} MB</Typography>
      </Stack>
    </Paper>
  );
}

const Paper = styled(BasePaper)({
  width: "100%",
  position: "relative",
  height: "55vh",
  cursor: "pointer",
  paddingBottom: "2rem",
  "&:hover": {
    boxShadow: "0 8px 11px rgba(33,33,33,.2)",
  },

  [theme.breakpoints.up("xs")]: {
    borderRadius: "0px",
    // boxShadow: '5px 0px 5px -5px rgba(0, 0, 0, 0.5), -5px 0px 5px -5px rgba(0, 0, 0, 0.5)',
    height: "50vh",
  },
});

const Img = styled("img")({
  height: "90%",
  width: "60%",
  boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.2) ",
});

export default ProductCard;
