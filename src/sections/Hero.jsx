/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import {Box, Typography, Grid} from '@mui/material';

const Hero = () => {
  return (
    <Box pt={6} pb={4} id="hero">
      {/* For sm screens only and above */}
      <Box sx={{display: {xs: 'none', sm: 'block'}}}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={4}>
            <Box display="flex" pr={2} pb={1} justifyContent="flex-end">
              <Typography variant="h4">{"< coder >"}</Typography>
            </Box>
            {/* For md screens only and above */}
            <Box sx={{display: {sm: 'none', md: 'block'}}}>
              <Box display="flex" pr={2}>
                <Typography variant="h5" align="right" color="textSecondary">
                  Security engineer with a DevOps mindset
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box pb={2}>
              <picture>
                <source srcSet="profile.webp, profile.jpg" />
                <img
                  alt="Thomas Laurenson - <coder> and educator"
                  src="profile.webp"
                  width="100%"
                  height="100%"
                  // eslint-disable-next-line react/no-unknown-property
                  css={css`
                    border-radius: 50%;
                    height: auto;
                    max-width: 100%;
                  `}
                />
              </picture>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box display="flex" justifyContent="flex-start" pl={2} pb={1}>
              <Typography variant="h4">{'educator'}</Typography>
            </Box>
            <Box sx={{display: {sm: 'none', md: 'block'}}}>
              <Box display="flex" justifyContent="flex-start" pl={2}>
                <Typography variant="h5" color="textSecondary">
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
            <picture>
              <source srcSet="profile.webp, profile.jpg" />
              <img
                alt="Thomas Laurenson - <coder> and educator"
                src="profile.webp"
                width="100%"
                height="100%"
                // eslint-disable-next-line react/no-unknown-property
                css={css`
                  border-radius: 50%;
                  height: auto;
                  max-width: 100%;
                `}
              />
            </picture>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero;
