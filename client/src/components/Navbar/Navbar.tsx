"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { nav_data } from "@/components/componentData";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
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
          {/* <DrawerNav /> */}
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
          <Box display="flex" gap={"20px"} sx={{ marginLeft: "auto" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Avatar src="/DefaultProfile.png"/>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;
