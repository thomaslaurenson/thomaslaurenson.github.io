/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import Profile from '../assets/profile.jpg';

const Hero = () => {
  return (
    <Box pt={6} pb={4} id='hero'>
      {/* For sm screens only and above */}
      <Box sx={{display: {xs: 'none', sm: 'block'}}}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={4}>
            <Box display='flex' pr={2} pb={1} justifyContent='flex-end'>
              {/* eslint-disable-next-line quotes */}
              <Typography variant='h4'>{'< coder >'}</Typography>
            </Box>
            {/* For md screens only and above */}
            <Box sx={{display: {sm: 'none', md: 'block'}}}>
              <Box display='flex' pr={2}>
                <Typography
                  variant='h5'
                  align='right'
                  color='textSecondary'
                >
                  Security consultant with a DevOps mindset
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box pb={2}>
              <img src={Profile}
                alt='Thomas Laurenson - <coder> and educator'
                // eslint-disable-next-line react/no-unknown-property
                css={
                  css`border-radius: 50%; height: auto; max-width: 100%;`
                } />
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box display='flex' justifyContent='flex-start' pl={2} pb={1}>
              <Typography variant='h4'>{'educator'}</Typography>
            </Box>
            <Box sx={{display: {sm: 'none', md: 'block'}}}>
              <Box display='flex' justifyContent='flex-start' pl={2}>
                <Typography variant='h5' color='textSecondary'>
                  Passionate InfoSec teacher and researcher
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* For xs screens only */}
      <Box sx={{display: {xs: 'block', sm: 'none'}}}>
        <Grid item xs={12}>
          <Box pb={2} pl={3} pr={3}>
            <img src={Profile}
              alt='Thomas Laurenson - <coder> and educator'
              // eslint-disable-next-line react/no-unknown-property
              css={
                css`border-radius: 50%; height: auto; width: 100%;`
              }
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero;
