import React, { useEffect} from "react";
import { Box, Typography } from "@mui/material";
import CourseCards from "./CourseCards";
import Grid from '@mui/material/Unstable_Grid2'
import { fetchAllCourses } from "@/services/operations/notesApi";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenAlert } from "@/redux/slices/alertSlice";
import errorHandler from "@/utils/errorHandler";
import { useAppSelector } from "@/redux/store";

type Props = {};

function Courses({}: Props) {
  const{loading, courses} = useAppSelector(state => state.coursesReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        await dispatch(fetchAllCourses());
      } catch (error: any) {
        console.error("Error:", error);
        dispatch(
          setOpenAlert({
            message: `${errorHandler(error.errors)}`,
            severe: "error",
          })
        );
      }
    };

    fetchCourseData();
  }, [dispatch])
  
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
        {courses.map((item) => (
          <Grid position='relative' xs={10} md={4} sm={5} key={item.id}>
            <CourseCards name={item.course_name}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Courses;
