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
      <Grid overflow='hidden' container rowSpacing={{xs: "0", sm: "2rem"}} columnSpacing={{xs: 0, sm: 2, md:1}}>
        {subjectData.Subject1.map((_,index) => (
          <Grid key={index} xs={6} sm={4} md={2.4}>
          <ProductCard/>
          </Grid>
        ))}
      </Grid>
      
    </Box>
  )
}

export default ComponentGrid