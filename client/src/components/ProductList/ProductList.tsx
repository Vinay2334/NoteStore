import { Stack } from '@mui/material'
import React from 'react'
import ProductListComponent from './ProductListComponent/ProductListComponent'

type Props = {}

function ProductList({}: Props) {
  return (
    <Stack>
        <ProductListComponent/>
    </Stack>
  )
}

export default ProductList