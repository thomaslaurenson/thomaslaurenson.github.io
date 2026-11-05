import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardHeader,
  Box,
  Typography,
} from '@mui/material';

const HistoryCard = ({data}) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Card elevation={0} variant='outlined'>
        <CardHeader
          disableTypography
          avatar={
            <Box component='picture' sx={{ display: 'block', width: 40, height: 40 }}>
              <source srcSet={`employers/${data.avatar}.avif`} type='image/avif' />
              <source srcSet={`employers/${data.avatar}.webp`} type='image/webp' />
              <Box
                component='img'
                src={`employers/${data.avatar}.jpg`}
                alt={data.company}
                width={40}
                height={40}
                loading='lazy'
                sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          }
          title={
            <Typography variant='h6' color='textPrimary'>
              {data.position}
            </Typography>
          }
          subheader={
            <Grid container justifyContent='space-between'>
              <Grid size={{ xs: 12 , sm: 6 }}>
                <Typography variant='subtitle2' color='textSecondary'>
                  {data.company}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 , sm: 6 }}>
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  align='right'
                >
                  {data.dates}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </Card>
    </Grid>
  );
};

HistoryCard.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    dates: PropTypes.string.isRequired,
  }).isRequired,
};

export default HistoryCard;
