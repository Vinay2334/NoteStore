"use client"
import { Box, Container, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import Avatar from '@mui/material/Avatar';
import PdfViewer from "@/components/PdfViewer/PdfViewer";
import ProductList from "@/components/ProductList/ProductList";

type Props = {};

function page({}: Props) {
  return (
    <Stack>
      <Box display="flex">
        <Box flexGrow={2}>
          <Stack gap={1}>
            <Typography variant="h4">Book Title</Typography>
            <Typography fontSize="0.8rem">May 18, 2015 | 18 likes</Typography>
            <Rating
              precision={0.5}
              defaultValue={4}
              sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}
            />
            <Stack direction="row" spacing={1}>
            <Avatar sx={{ width: 24, height: 24 }} alt="Profile Image" src="/DefaultProfile.png" />
            <Typography>Author</Typography>
            </Stack>
            
          </Stack>
          <Stack marginTop='2rem'>
            <Typography fontSize="1.1rem">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              illo eveniet a fugiat quam nisi sit asperiores dolorum sed id.
            </Typography>
          </Stack>
          <PdfViewer/>
          {/* <Sample/> */}
        </Box>
        <Box flexGrow={1} sx={{ backgroundColor: "" }}>
          <Typography variant="h6">Recommended</Typography>
          <ProductList/>
        </Box>
      </Box>
      <Box>

      </Box>
    </Stack>
  );
}

export default page;
