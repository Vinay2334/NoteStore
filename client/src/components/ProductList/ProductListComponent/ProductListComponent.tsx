import { Stack } from '@mui/material';
import React from 'react';
import Image from 'next/image';

type Props = {}

function ProductListComponent({}: Props) {
  return (
    <Stack direction="row" border="3px solid black">
        <Image
            width={50}
            height={50}
            src="/book2.jpeg"
            alt='File Image'
        />
    </Stack>
  )
}

export default ProductListComponent