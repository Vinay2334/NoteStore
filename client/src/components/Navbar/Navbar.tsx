"use client";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  Avatar,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { nav_data } from "@/components/componentData";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AvatarNav from "./AvatarNav";
import DrawerNav from "./DrawerNav";
import Link from "next/link";
import AuthModal from "../Modal/AuthModal";
import AppAlert from "../AppAlert";

type Props = {};
function Navbar({}: Props) {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          {isMatch ? (
            <DrawerNav />
          ) : (
            <>
            <Link href='/'>
              <Box
                component="img"
                sx={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                }}
                src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711065600&semt=ais"
                alt="Logo"
              />
              </Link>
              <Box sx={{marginLeft:5}}>
                <Tabs
                  value={value}
                  onChange={(e, value) => setValue(value)}
                  indicatorColor="secondary"
                  textColor="inherit"
                >
                  {nav_data.map((item, index) => (
                    <Tab key={index} label={`${item}`} />
                  ))}
                </Tabs>
              </Box>
            </>
          )}
          <Box
            boxSizing={"border-box"}
            display="flex"
            alignItems={"center"}
            gap={"10px"}
            sx={{
              marginLeft: "auto",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <AvatarNav />
            <AuthModal/>
          </Box>
        </Toolbar>
      </AppBar>
      <AppAlert/>
    </React.Fragment>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default Navbar;
