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

type Props = {};
function Navbar({}: Props) {
  const [value, setValue] = useState(null);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography>Logo</Typography>
          {isMatch ? (
            <DrawerNav />
          ) : (
            <>
              <Box>
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
              {/* <Box
                boxSizing={"border-box"}
                display="flex"
                alignItems={"center"}
                gap={"10px"}
                sx={{ marginLeft: "auto" }}
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
              </Box> */}
            </>
          )}
          <Box
            boxSizing={"border-box"}
            display="flex"
            alignItems={"center"}
            gap={"10px"}
            sx={{
              marginLeft: 'auto'
            }}
          >
            {/* marginLeft: "auto", */}
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
          </Box>
        </Toolbar>
      </AppBar>
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
    // vertical padding + font size from searchIcon
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
