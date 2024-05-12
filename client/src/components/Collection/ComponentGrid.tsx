import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ProductCard from "../ProductCard/ProductCard";
import { Box } from "@mui/material";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenAlert } from "@/redux/slices/alertSlice";
import errorHandler from "@/utils/errorHandler";
import { apiConnector } from "@/services/apiconnector";
import { notes_endpoints } from "@/services/api";
const { GET_ALL_NOTES_API } = notes_endpoints;
type Props = {
  filters: Object | null;
};

function ComponentGrid({ filters }: Props) {
  const [docs, setDocs] = useState([]);
  const dispatch = useAppDispatch();
  // Think of a better way to do this
  useMemo(() => {
    const fetchDocs = async () => {
      try {
        const response = await apiConnector(
          "GET",
          GET_ALL_NOTES_API,
          null,
          undefined,
          filters
        );
        console.log("fetchAlldocs", response.data);
        setDocs(response.data.results);
      } catch (error: any) {
        dispatch(
          setOpenAlert({
            message: `${errorHandler(error.errors)}`,
            severe: "error",
          })
        );
      }
    };
    fetchDocs();
  }, [dispatch, filters]);

  return (
    <Box>
      <Grid
        overflow="hidden"
        container
        rowSpacing={{ xs: "0", sm: "2rem" }}
        columnSpacing={{ xs: 0, sm: 2, md: 1 }}
      >
        {docs?.map((result, index) => (
          <Grid key={index} xs={6} sm={4} md={2.4}>
            <ProductCard doc={result} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ComponentGrid;
