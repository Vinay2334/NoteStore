import React, {MouseEvent, useEffect} from "react";
import { Box, Typography } from "@mui/material";
import CourseCard from "./SubjectCards";
import Grid from '@mui/material/Unstable_Grid2'
import { fetchAllSubjects } from "@/services/operations/notesApi";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenAlert } from "@/redux/slices/alertSlice";
import errorHandler from "@/utils/errorHandler";
import { useAppSelector } from "@/redux/store";

type Props = {};

function Subjects({}: Props) {
  const{loading, subjects} = useAppSelector(state => state.subjectsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        await dispatch(fetchAllSubjects());
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

    fetchSubjectData();
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
        Subjects
      </Typography>
      <Grid justifyContent='center' container mt={3} rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 5 }}>
        {subjects.map((item) => (
          <Grid position='relative' xs={10} md={4} sm={5} key={item.id}>
            <CourseCard name={item.name}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Subjects;
