"use client";
import DropdownBar from "@/components/DropDown/DropdownBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOpenAlert } from "@/redux/slices/alertSlice";
import errorHandler from "@/utils/errorHandler";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import UploadIcon from "@mui/icons-material/Upload";
import { progressDataInterface, uploadFormInterface } from "@/typings";
import { uploadDocs } from "@/services/operations/notesApi";
import { useRouter } from "next/navigation";
import { categories } from "@/components/componentData";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import {styled} from "@mui/material/styles";

type Props = {};

function page({}: Props) {
  const router = useRouter();
  const [progressData, setProgressData] = useState<progressDataInterface> ({
    progress:0,
    uploaded:0,
    total_size:0
  });
  const form = useForm({
    defaultValues: {
      title: "",
      subject: 0,
      course: 0,
      category: "NOTES",
      upload_file: "",
      thumbnail: "",
      tags: [],
    } as uploadFormInterface,
  });
  const {
    register,
    handleSubmit,
    formState,
    watch,
    resetField,
    setValue,
    control,
  } = form;
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authReducer);
  const { loading } = useAppSelector((state) => state.notesReducer);
  const { subjects } = useAppSelector((state) => state.subjectsReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const handleThumbnailSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setThumbnailPreview(imageUrl);
      setValue("thumbnail", file);
    }
  };
  const resetThumbnailState = () => {
    resetField("thumbnail");
    setThumbnailPreview(undefined);
  };
  const handleFileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setValue("upload_file", file);
    }
  };
  const onSubmit = async (data: uploadFormInterface) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subject", data.subject.toString());
    formData.append("course", data.course.toString());
    formData.append("category", data.category);
    formData.append("upload_file", data.upload_file);
    formData.append("thumbnail", data.thumbnail);

    await dispatch(uploadDocs({ data: formData, token, setProgressData }));
    router.push("/uploads");
  };
  console.log(watch());

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center">
        <Box
          width={{ md: "40%", xs: "100%" }}
          border="4px solid black"
          padding={{ md: 8, xs: 2 }}
        >
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(onSubmit)}
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
                <DropdownBar
                  items={subjects}
                  label={"Select Subject"}
                  setValue={setValue}
                  fieldName={"subject"}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography flexGrow={1}>Course</Typography>
                <DropdownBar
                  items={courses}
                  label={"Select Course"}
                  setValue={setValue}
                  fieldName={"course"}
                />
              </Box>
              {/* <Box display="flex" alignItems="center">
                <Typography flexGrow={1}>Category</Typography>
                <DropdownBar
                  items={categories}
                  label={"Select Category"}
                  setValue={setValue}
                  fieldName={"category"}
                />
              </Box> */}
              <Box display="flex" alignItems="center">
                <Typography flexGrow={1}>Upload file</Typography>
                <input
                  style={{ flexGrow: "2", border: "1px solid black" }}
                  type="file"
                  accept=".pdf"
                  required
                  onChange={handleFileSubmit}
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
                  <StyledImage
                    width={200}
                    height={200}
                    alt="Thumbnail"
                    src={thumbnailPreview}
                    // style={{ cursor: "not-allowed" }}
                    onClick={resetThumbnailState}
                  />
                )}
              </Box>
              <Button
                sx={{ width: "70%", margin: "auto" }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                <UploadIcon />
                Upload
              </Button>
              {progressData.progress > 0 && <ProgressBar value={progressData.progress} progressData={progressData} />}
            </Stack>
          </form>
          <DevTool control={control} />
        </Box>
      </Box>
    </React.Fragment>
  );
}

const StyledImage = styled(Image)({
  cursor:"not-allowed",
  "&:hover":{
    filter:"grayscale(100%)"
  }
})

export default page;
