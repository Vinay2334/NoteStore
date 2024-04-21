import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Carousel from './CarouselFolder/Carousel';

type Props = {}

function Banner({}: Props) {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' height={{
      sm: '73vh',
    }}>
      <Grid gap={{xs: '1rem', sm:'0px'}} paddingBottom={2} height='100%' container sx={{background: 'url("banner.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <Grid sm={6} md={7} alignContent='center'>
          <Typography textAlign={{xs: 'center', sm:'left'}} fontWeight={1000} sx={{
            fontSize:{
              'xs':'2rem',
              'sm':'3.5rem',
            }
          }}>Lorem ipsum dolor sit.</Typography>
          <Typography fontWeight={600} textAlign={{xs: 'center', sm:'left'}} sx={{
            fontSize:{
              'xs':'1rem',
              'sm': '1.3rem',
            }
          }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, odit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quibusdam.</Typography>
        </Grid>
          <Grid sm={6} md={5} alignContent='center'>
            <Carousel/>
          </Grid>
      </Grid>
    </Box>
  )
}

export default Banner