import React from "react";
import { Box, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import Grid from '@mui/material/Unstable_Grid2'

type Props = {};

function Courses({}: Props) {
  return (
    <Box
      mt={5}
      padding="0 5rem 0 5rem"
      boxSizing="border-box"
    >
      <Typography textAlign="center" variant="h3">
        Courses
      </Typography>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={4} key={index}>
            <CourseCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Courses;
