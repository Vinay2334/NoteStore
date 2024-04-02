import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {subjects} from '@/components/componentData';
import ComponentGrid from './ComponentGrid';

type Props = {}

function Collection({}: Props) {
  return (
    <Box mt={5} padding='0 1rem 0 1rem' boxSizing='border-box' overflow='hidden'>
        <Typography textAlign='center' variant='h3'>Collection</Typography>
        <Stack gap={4}>
            {subjects.map((subject, index) => (
                <Box key={index} display='flex' flexDirection='column' gap={3}>
                    <Typography variant='h5'>{subject}</Typography>
                    <ComponentGrid/>
                </Box>
            ))}
        </Stack>
    </Box>
  )
}

export default Collection