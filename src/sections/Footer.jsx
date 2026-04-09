import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Link,
} from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  return (
    <footer>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 2 }}>
            <Typography variant='body2'>
              © {new Date().getFullYear()}, Thomas Laurenson
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2, pr: 1, pl: 1 }}>
            <Typography variant='body2' sx={{ display: 'flex' }}>
              Built with
              <FavoriteIcon fontSize='small' />
              and
              <CoffeeIcon fontSize='small' />
              using
              <Link
                href='https://vitejs.dev/'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ pl: 0.5, pr: 0.5 }}>
                Vite
              </Link>
              and
              <Link
                href='https://mui.com/'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ pl: 0.5, pr: 0.5 }}>
                MUI
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
