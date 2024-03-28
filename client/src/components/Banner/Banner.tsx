import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import BannerRight from './BannerRight'

type Props = {}

function Banner({}: Props) {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' >
      <Grid boxSizing={'border-box'} padding={3} container mt={1} display={'flex'} sx={{background: 'url("banner.png")', width: '98%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <Grid mt={20} width={'60%'} height={'inherit'}>
          <Typography variant="h2">Lorem ipsum dolor sit.</Typography>
          <Typography variant="h5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, odit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quibusdam.</Typography>
        </Grid>
        <Grid sx={{backgroundColor: 'wheat'}} width={'40%'}>
          <BannerRight/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Banner