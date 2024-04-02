'use client'
import { Box, Container, Paper, Rating, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {}

function ProductCard({}: Props) {
  return (
    <Paper elevation={3} sx={{width: '100%', position: 'relative', height:'25rem'}}>
        <Box position='absolute' right='2px' top='2px' width={40} height={40} borderRadius='50%' sx={{backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <FavoriteIcon sx={{color: 'red'}}/>
        </Box>
        <Img src="book1.jpeg" alt="" />
        <Stack marginLeft={1} height='40%'>
        <Typography variant='h5'>New Title</Typography>
        <Typography>Subject: english</Typography>
        <Rating precision={0.5} defaultValue={2.5}/>
        <Typography color='gray'>Contributor: name</Typography>
        <Typography>Date created: 12 Mar 2020</Typography>
        <Typography>Size: 12M</Typography>
        </Stack>
    </Paper>
  )
}

const Img = styled('img')({
    width: '100%',
    height: '60%',
})

export default ProductCard