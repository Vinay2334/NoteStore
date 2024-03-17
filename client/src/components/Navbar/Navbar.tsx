"use client";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import DrawerNav from "./DrawerNav";
import { useTheme } from "@mui/material";
type Props = {};

function Navbar({}: Props) {
  const [value, setValue] = useState(null);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography>Shopee</Typography>
              <DrawerNav />
            </>
          ) : (
            <>
              <Tabs
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="secondary"
                sx={{ marginLeft: "auto" }}
                textColor="inherit"
              >
                <Tab label="products" />
                <Tab label="products" />
                <Tab label="products" />
                <Tab label="products" />
                <Tab label="products" />
              </Tabs>
              <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;
