import React, { useState } from "react";
import {
  Box,
  Button as BaseButton,
  styled,
  keyframes,
  Typography,
  Container,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

type Props = {
  imageUrls: string[];
};

function ImageSlider({ imageUrls }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  function showNext() {
    setImageIndex((index) => {
      if (index === imageUrls.length - 1) return 0;
      return index + 1;
    });
  }
  function showPrev() {
    setImageIndex((index) => {
      if (index === 0) return imageUrls.length - 1;
      return index - 1;
    });
  }
  return (
    <Box boxSizing="border-box" position="relative" height="80%" width="50%">
      <Box
        position="relative"
        width="100%"
        height="100%"
        overflow="hidden"
        display="flex"
        borderRadius={2}
        boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      >
        {imageUrls.map((url) => (
          <>
            <Container
              sx={{
                width: "50%",
                position: "absolute",
                backgroundColor: "white",
                mt: "2em",
              }}
            >
              <Typography fontSize={{
                sm: '1rem',
                md: '1.2rem',
              }}>Book title {imageIndex + 1}</Typography>
            </Container>
            <Img
              sx={{ translate: `${-100 * imageIndex}%` }}
              key={url}
              src={url}
              alt="Book Images"
            />
          </>
        ))}
      </Box>
      <ArrowButton
        aria-label="previous button"
        onClick={showPrev}
        sx={{ left: "0" }}
      >
        <ArrowBackIosIcon />
      </ArrowButton>
      <ArrowButton
        aria-label="next button"
        onClick={showNext}
        sx={{ right: "0" }}
      >
        <ArrowForwardIosIcon />
      </ArrowButton>
      <Box
        position="absolute"
        bottom=".5rem"
        left="50%"
        display="flex"
        gap=".25rem"
        sx={{ translate: "-50%" }}
      >
        {imageUrls.map((_, index) => (
          <DotButton onClick={() => setImageIndex(index)}>
            {index === imageIndex ? (
              <FiberManualRecordIcon />
            ) : (
              <FiberManualRecordOutlinedIcon />
            )}
          </DotButton>
        ))}
      </Box>
    </Box>
  );
}

const squishAnimation = keyframes`
    50% {
        scale: 1.4 0.6;
    }
`;

const Img = styled("img")({
  width: "100%",
  height: "100%",
  display: "block",
  flexShrink: 0,
  flexGrow: 0,
  transition: "translate 300ms ease-in-out",
});

const ArrowButton = styled(BaseButton)(({ theme }) => ({
  all: "unset",
  display: "block",
  position: "absolute",
  top: 0,
  bottom: 0,
  padding: "1rem",
  cursor: "pointer",
  transition: "background-color 100ms ease-in-out",

  "&:first-child": {
    stroke: "white",
    fill: "black",
    height: "2rem",
    width: "2rem",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    animation: `${squishAnimation} 200ms ease-in-out`,
  },
}));

const DotButton = styled(BaseButton)(({ theme }) => ({
  all: "unset",
  display: "block",
  width: "1rem",
  height: "1rem",
  cursor: "pointer",
  transition: "transform 100ms ease-in-out",

  "& > *": {
    fill: "black",
    height: "100%",
    width: "100%",
  },

  "&:hover": {
    transform: "scale(1.2)",
  },
}));

export default ImageSlider;
