"use client";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { nav_data } from "../componentData";
import Link from "next/link";
type Props = {};

const DrawerNav = (props: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{width: 250}}>
        <Box display='flex' flexDirection='column' alignItems='center'>
        <Link href='/'>
        <Box
          component='img'
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 200, md: 167 },
            maxWidth: { xs: 200, md: 250 },
            borderRadius: 50,
          }}
          alt='logo'
          src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711065600&semt=ais'
        />
        </Link>
        </Box>
        <List>
          {nav_data.map((item, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>{item}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        </Box>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerNav;
