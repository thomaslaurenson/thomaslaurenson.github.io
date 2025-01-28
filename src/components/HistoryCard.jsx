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
    <Grid item xs={12}>
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
              <Grid item xs={12} sm={6}>
                <Typography variant='subtitle2' color='textSecondary'>
                  {data.company}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
  data: PropTypes.object,
};

export default HistoryCard;
