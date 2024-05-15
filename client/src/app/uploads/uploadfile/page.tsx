"use client";
import DropdownBar from "@/components/DropDown/DropdownBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import UploadIcon from '@mui/icons-material/Upload';

type Props = {};

function page({}: Props) {
  const form = useForm({
    defaultValues: {
      title: "",
      subject: 0,
      course: 0,
      category: "",
      url: "",
      thumbnail: {},
      tags: [],
    },
  });
  const { register, handleSubmit, formState, watch, resetField, setValue, control } = form;
  const [thumbnailPreview, setThumbnailPreview] = useState<
    string | undefined
  >(undefined);
  const dispatch = useAppDispatch();
  const { loading, subjects } = useAppSelector(
    (state) => state.subjectsReducer
  );
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const handleThumbnailSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Set the file to the form state
      // setValue("profile_pic", file);
      // Create temporary URL for the image and store it in component state for preview
      const imageUrl = URL.createObjectURL(file);
      setThumbnailPreview(imageUrl);
      console.log('Fie', file);
      setValue('thumbnail', file)
    }
  };
  console.log(form);

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center">
        <Box width="40%" border="4px solid black" padding={8}>
          <form
            style={{ width: "100%" }}
            // onSubmit={handleSubmit(onSubmit)}
            noValidate
            encType="multipart/form-data"
          >
            <Stack gap={5}>
              <Box display="flex" alignItems="center">
                <Typography flexGrow={1}>Title</Typography>
                <TextField
                  sx={{ flexGrow: "2" }}
                  placeholder="Enter Title"
                  type="text"
                  required
                  {...register("title", {
                    required: "title is required",
                  })}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography flexGrow={1}>Subject</Typography>
                <DropdownBar items={subjects} label={"Select Subject"} />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography flexGrow={1}>Course</Typography>
                <DropdownBar items={courses} label={"Select Course"} />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography flexGrow={1}>Upload file</Typography>
                <input
                  style={{ flexGrow: "2", border: "1px solid black" }}
                  type="file"
                  accept=".pdf"
                  {...register("url", {
                    required: "File is required",
                  })}
                />
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <label
                  htmlFor="thumbnail_input"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <Button variant="outlined" component="span">
                    <ImageIcon />
                    Thumbnail
                  </Button>
                </label>
                <input
                  type="file"
                  id="thumbnail_input"
                  // name="thumbnail"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleThumbnailSubmit}
                />
                {thumbnailPreview && (
                  <Image
                    width={200}
                    height={200}
                    alt="Thumbnail"
                    src={thumbnailPreview}
                    style={{ cursor: "not-allowed" }}
                    onClick={() => resetField('thumbnail')}
                  />
                )}
              </Box>
              <Button
                sx={{ width: "70%", margin:'auto' }}
                type="submit"
                variant="contained"
                color="primary"
              >
                <UploadIcon/>
                Upload
              </Button>
            </Stack>
          </form>
          <DevTool control={control}/>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default page;
