"use client";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { fetch_all_notes } from "@/services/operations/notesApi";
import { useDispatch } from "react-redux";
import { setNotes } from "../redux/slices/notesSlice";
import { AppDispatch } from "@/redux/store";
import { Box, Grid, Typography } from "@mui/material";
import Banner from "@/components/Banner/Banner";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <main>
      <Banner/>
    </main>
  );
}
