import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { subjectData } from '../componentData'
import ProductCard from '../ProductCard/ProductCard'
import { Box } from '@mui/material'
type Props = {
}

function ComponentGrid({}: Props) {
  return (
    <Box>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 20 }}>
        {subjectData.Subject1.map((_,index) => (
          <Grid key={index} xs={3}>
          <ProductCard/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ComponentGrid