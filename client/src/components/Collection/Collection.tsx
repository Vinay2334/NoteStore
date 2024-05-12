import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { subjects } from "@/components/componentData";
import ComponentGrid from "./ComponentGrid";

type Props = {};

function Collection({}: Props) {
  return (
    <Box
      mt={5}
      padding={{
        md: "0 5rem 0 5rem",
        xs: "0",
      }}
      boxSizing="border-box"
    >
      <Typography
        fontSize={{
          xs: "2rem",
          sm: "3rem",
        }}
        textAlign="center"
        variant="h3"
      >
        Collection
      </Typography>
      <Stack gap={4}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h5">Books</Typography>
          <ComponentGrid filters={{ category: "books" }} />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h5">Notes</Typography>
          <ComponentGrid filters={{ category: "notes" }} />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h5">PYQ</Typography>
          <ComponentGrid filters={{ category: "pyq" }} />
        </Box>
      </Stack>
    </Box>
  );
}

export default Collection;
