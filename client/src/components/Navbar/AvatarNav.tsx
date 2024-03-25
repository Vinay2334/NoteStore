import React from 'react'
import { Dropdown, MenuButton as BaseMenuButton, Menu, MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base";
import {blue} from '@mui/material/colors'
import { useTheme } from '@emotion/react';
import { styled, alpha } from "@mui/material/styles";
import { Avatar, Box } from '@mui/material';
import { useAppSelector } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import {handleOpen} from '@/redux/slices/modalSlice';
type Props = {}

function AvatarNav({}: Props) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
  return (
        <Dropdown>
            <MenuButton sx={{padding: '0','background-color': 'inherit', border:'none'}}>
              <Avatar sx={{padding:'0'}} src="/DefaultProfile.png" />
            </MenuButton>
            <Menu slots={{ listbox: Listbox }}>
            <MenuItem onClick={() => dispatch(handleOpen())}>Login/SignUp</MenuItem>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Language settings</MenuItem>
            <MenuItem>Log out</MenuItem>
            </Menu>
            </Dropdown>
  )
}

const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
    z-index: 1;
    `,
  );
  
  const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]};
      color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]};
    }
    `,
  );
  
  const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    backgroundColor: inherit;
    color: inherit;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    // &:hover {
    //   background: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50]};
    //   border-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[300]};
    // }
  
    // &:active {
    //   background: ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100]};
    // }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
    `,
  );

export default AvatarNav