import { Opacity } from "@mui/icons-material";
import { Box, Paper as BasePaper, Typography, styled } from "@mui/material";
import { transform } from "next/dist/build/swc";
import React, { MouseEvent } from "react";

type Props = {};

function CourseCard({}: Props) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const paper = e.currentTarget as HTMLElement;
    const pseudo_element = paper.querySelector(":before") as HTMLElement;
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    paper.style.setProperty("--x", x + "px");
    paper.style.setProperty("--y", y + "px");
  };
  return (
    <Paper onMouseMove={handleMouseMove}>
      <Typography fontSize={{
        xs: '1rem',
        sm: '1.3rem',
      }}>Subject Name</Typography>
    </Paper>
  );
}

const Paper = styled(BasePaper)({
  width: "100%",
  position: "relative",
  borderRadius: "30px",
  height: "20vh",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // background: 'rgba(45,45,45,1)',
  backgroundImage:
    "radial-gradient( circle 311px at 8.6% 27.9%,  rgba(62,147,252,0.57) 12.9%, rgba(239,183,192,0.44) 91.2% )",
  overflow: 'hidden',

  "@media (max-width:600px)": {
    height: "10vh",
    borderRadius: '10px'
  },

  // "&::before": {
  //   content: '""',
  //   position: "absolute",
  //   background: "radial-gradient(#0f0, transparent, transparent)",
  //   width: "700px",
  //   height: "400px",
  //   top: "var(--y)",
  //   left: "var(--x)",
  //   transform: 'translate(-50%, -50%)',
  //   opacity: 0,
  //   transition: '0.5s, top 0s, left 0s',
  // },

  // "&:hover::before":{
  //   opacity: 1
  // },

  // "&::after":{
  //   content: '""',
  //   position: 'absolute',
  //   inset: '2px',
  //   borderRadius: '18px',
    // background: 'rgba(45,45,45,0.75)'
  // }
});

export default CourseCard;
