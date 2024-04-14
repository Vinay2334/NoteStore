import { Box, Paper as BasePaper, Typography, styled } from "@mui/material";
import React from "react";

type Props = {};

function CourseCard({}: Props) {
  return (
    <Paper>
      <Typography variant="h6">Applied Subject</Typography>
    </Paper>
  );
}

const Paper = styled(BasePaper)({
  width: "100%",
  position: "relative",
  borderRadius: '40px',
  height: "10rem",
  cursor: "pointer",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'radial-gradient( circle 311px at 8.6% 27.9%,  rgba(62,147,252,0.57) 12.9%, rgba(239,183,192,0.44) 91.2% )',
});

export default CourseCard;
