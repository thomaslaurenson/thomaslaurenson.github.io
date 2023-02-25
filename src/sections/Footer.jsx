/* eslint-disable quote-props */
/** @jsxImportSource @emotion/react */
import {
  Grid,
  Box,
  Divider,
  Typography,
  Link,
} from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  return (
    <Box id='footer'>
      <Divider />
      <footer>
        <Grid container className='footerContainer'>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='center' pt={2} pb={2}>
              <Typography variant='body2'>
                © {new Date().getFullYear()}, Thomas Laurenson
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='center' pb={2} pr={1} pl={1}>
              <Typography variant='body2' display='flex'>
                Built with
                <FavoriteIcon fontSize='small' />
                love and
                <CoffeeIcon fontSize='small' />
                coffee using
                <Link
                  href='https://vitejs.dev/' pl={0.5} pr={0.5}>
                  Vite
                </Link>
                and
                <Link
                  href='https://mui.com/' pl={0.5} pr={0.5}>
                  MUI
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </footer>
    </Box>
  );
};

export default Footer;
