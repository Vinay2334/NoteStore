"use client";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotes } from "../redux/slices/notesSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Box, Grid, Typography } from "@mui/material";
import Collection from '@/components/Collection/Collection';
import Banner from "@/components/Banner/Banner";
import Subjects from "@/components/Subjects/Subjects";
import { useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/services/operations/userApi";

export default function Home() {
  const {token} = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = async() => {
      await dispatch(getUser(token));
    }
    if(token){
      fetchUser();
    }
  }, [dispatch])
  
  return (
    <main>
      <Banner/>
      <Subjects/>
      <Collection/>
    </main>
  );
}
