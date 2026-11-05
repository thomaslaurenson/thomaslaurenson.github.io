import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

// Stand-in media area for projects without a screenshot, using the
// highest-emphasis surface container so it reads as an empty image slot.
const MediaPlaceholder = ({ name }) => {
  return (
    <Box
      aria-hidden='true'
      sx={{
        aspectRatio: '7 / 3',
        bgcolor: 'm3.surfaceContainerHighest',
        color: 'm3.onSurfaceVariant',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h5' component='span'>
        {name}
      </Typography>
    </Box>
  );
};

MediaPlaceholder.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MediaPlaceholder;
