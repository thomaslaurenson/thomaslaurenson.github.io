/* eslint-disable quote-props */
/** @jsxImportSource @emotion/react */
import {
  Grid,
  Box,
  Divider,
  Typography,
  Link,
} from '@mui/material';
import {css} from '@emotion/react';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Footer = () => {
  const scrollUpStyle = css({
    width: '100px',
    height: '50px',
    marginBottom: '-10px',
    borderRadius: '150px 150px 0 0',
    borderBottom: 'none',
    transitionProperty: 'all',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
    transitionDelay: '0s',
    '&:hover': {
      MozTransform: 'translateY(-9px)',
      MsTransform: 'translateY(-9px)',
      OTransform: 'translateY(-9px)',
      WebkitTransform: 'translateY(-9px)',
      transform: 'translateY(-9px)',
    },
  });

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <Box id='footer'>
      <Box
        display='flex'
        justifyContent='center'
      >
        <Box
          className="footerScrollUpButton"
          css={scrollUpStyle}
          display='flex'
          alignItems='center'
          justifyContent='center'
          onClick={scrollToTop}
        >
          <ExpandLessIcon />
        </Box>
      </Box>
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
