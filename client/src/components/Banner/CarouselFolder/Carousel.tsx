import React from "react";
import ImageSlider from "./ImageSlider";
import { Box } from "@mui/material";

const IMAGES = [
  "./book1.jpeg",
  "./book2.jpeg",
  "./book3.jpeg",
  "./book4.jpeg",
  "./book5.jpeg",
];

type Props = {};

function Carousel({}: Props) {
  return (
    <Box
      width="100%"
      height={{
        sm: '80%',
        md: '100%',
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ImageSlider imageUrls={IMAGES} />
    </Box>
  );
}

export default Carousel;
