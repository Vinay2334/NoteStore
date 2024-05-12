"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenAlert } from "@/redux/slices/alertSlice";
import {
  fetchAllCourses,
  fetchAllSubjects,
} from "@/services/operations/notesApi";
import errorHandler from "@/utils/errorHandler";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

type Props = {};

function DataFetcher({}: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        await dispatch(fetchAllSubjects());
      } catch (error: any) {
        dispatch(
          setOpenAlert({
            message: `${errorHandler(error.errors)}`,
            severe: "error",
          })
        );
      }
    };

    const fetchCourseData = async () => {
      try {
        await dispatch(fetchAllCourses());
      } catch (error: any) {
        dispatch(
          setOpenAlert({
            message: `${errorHandler(error.errors)}`,
            severe: "error",
          })
        );
      }
    };

    fetchSubjectData();
    fetchCourseData();
  }, [dispatch]);
  return <Box display="none"></Box>;
}

export default DataFetcher;
