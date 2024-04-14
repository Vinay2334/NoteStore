'use client'
import CourseCard from "@/components/Courses/CourseCard";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <Box mt={15} height='100%'>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 20 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <CourseCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default page;
