"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import { logIn, logOut } from "@/redux/slices/authSlice";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main>
      <h1>Heading</h1>
      <Button variant="contained" color="secondary">Button</Button>
    </main>
  );
}
