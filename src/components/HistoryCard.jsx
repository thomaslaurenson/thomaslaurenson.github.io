import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  Typography,
} from '@mui/material';

const HistoryCard = ({data}) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Card elevation={0} variant='outlined'>
        <CardHeader
          disableTypography
          avatar={
            <Avatar
              variant='square'
              alt={data.company}
              srcSet={`employers/${data.avatar}.webp,
                       employers/${data.avatar}.jpg`}
              src={`employers/${data.avatar}.webp`}
            />
          }
          title={
            <Typography variant='h5' color='textPrimary'>
              {data.position}
            </Typography>
          }
          subheader={
            <Grid container justify='space-between'>
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
