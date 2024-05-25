import { progressDataInterface } from '@/typings';
import { Box, LinearProgress, LinearProgressProps, Stack, Typography } from '@mui/material';
import React from 'react'

type Props = {}

function ProgressBar(props: LinearProgressProps & { value: number } & {progressData: progressDataInterface}) {
    return (
      <Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress sx={{height: '1rem'}} variant="determinate" {...props} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.value,
            )}%`}</Typography>
          </Box>
        </Box>
        <Typography fontSize={15}>{props.progressData.uploaded}/{props.progressData.total_size}</Typography>
        </Stack>
      );
}

export default ProgressBar