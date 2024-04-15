import { Box, Paper as BasePaper, Typography, styled } from "@mui/material";
import React, { MouseEvent } from "react";

type Props = {};

function CourseCard({}: Props) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const paper = e.currentTarget as HTMLElement;
    const pseudo_element = paper.querySelector(":before") as HTMLElement;
    let x = e.pageX - rect.left;
    let y = e.pageY - rect.top;
    paper.style.setProperty("--x", x + "px");
    paper.style.setProperty("--y", y + "px");
  };
  return (
    <Paper onMouseMove={handleMouseMove}>
      <Typography variant="h6">Subject Name</Typography>
    </Paper>
  );
}

const Paper = styled(BasePaper)({
  width: "100%",
  position: "relative",
  borderRadius: "30px",
  height: "10rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient( circle 311px at 8.6% 27.9%,  rgba(62,147,252,0.57) 12.9%, rgba(239,183,192,0.44) 91.2% )",
  // transform: "translate(-50%, -50%)",

  "&::before": {
    content: '""',
    position: "absolute",
    background: "radial-gradient(#0f0, transparent)",
    width: "300px",
    height: "100px",
    top: "var(--y)",
    left: "var(--x)",
  },
});

export default CourseCard;
