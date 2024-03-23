"use client";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { fetch_all_notes } from "@/services/operations/notesApi";
import { useDispatch } from "react-redux";
import { setNotes } from "../redux/slices/notesSlice";
import { AppDispatch } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const result = fetch_all_notes();
    dispatch(setNotes(result));
  })
  return (
    <main>
      <h1>Headings</h1>
    </main>
  );
}
