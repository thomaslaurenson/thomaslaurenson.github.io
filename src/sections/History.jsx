import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import HistoryCard from '../components/HistoryCard';
import { employers } from '../data/constants';

const History = () => {
  return (
    <Box sx={{ pt: 6, pb: 4 }} id='history'>
      <Box sx={{ pb: 6 }}>
        <Typography variant='h4' align='center' sx={{ fontWeight: 700 }}>
          History
        </Typography>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        {employers.map((employer, index) => {
          return <HistoryCard data={employer} key={index} />;
        })}
      </Grid>
    </Box>
  );
};

export default History;
