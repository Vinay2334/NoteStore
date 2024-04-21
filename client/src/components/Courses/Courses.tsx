import React, {MouseEvent} from "react";
import { Box, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import Grid from '@mui/material/Unstable_Grid2'

type Props = {};

function Courses({}: Props) {
  return (
    <Box
      mt={5}
      padding={{
        md: "0 5rem 0 5rem",
      }}
      boxSizing="border-box"
    >
      <Typography textAlign="center" fontSize={{
        xs: '2rem',
        sm: '3rem',
      }}>
        Courses
      </Typography>
      <Grid justifyContent='center' container mt={3} rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 5 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid position='relative' xs={10} md={4} sm={5}  key={index}>
            <CourseCard/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Courses;
