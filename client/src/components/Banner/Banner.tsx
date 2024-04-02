import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Carousel from './CarouselFolder/Carousel';

type Props = {}

function Banner({}: Props) {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' height='73vh'>
      <Grid height='inherit' boxSizing={'border-box'} container mt={1} display={'flex'} sx={{background: 'url("banner.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <Grid width={'60%'} height='100%'>
          <Typography mt={20} variant="h2">Lorem ipsum dolor sit.</Typography>
          <Typography variant="h5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, odit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quibusdam.</Typography>
        </Grid>
          <Grid width='40%' sx={{backgroundColor: ''}}>
            <Carousel/>
          </Grid>
      </Grid>
    </Box>
  )
}

export default Banner