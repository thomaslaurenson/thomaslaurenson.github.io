/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  Divider,
  Link,
  Button,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import { socialLinks } from './data/constants';

const Navbar = ({changeTheme, isDarkTheme}) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const dropDownMenuList = () => (
    <div
      role='presentation'
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      {/* Toolbar to add top-padding */}
      <Toolbar />
      <List>
        <Link href='#history' color='inherit' underline='none'>
          <ListItem style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h6'>
              history
            </Typography>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href='#portfolio' color='inherit' underline='none'>
          <ListItem style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h6'>
              portfolio
            </Typography>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, py: 1 }}>
        {socialButtons()}
      </Box>
    </div>
  );

  const socialButtons = () => (
    <>
      <IconButton component='a' href={socialLinks.email} aria-label='Email'>
        <EmailIcon />
      </IconButton>
      <IconButton
        component='a'
        href={socialLinks.github}
        aria-label='GitHub'
        target='_blank'
        rel='noopener noreferrer'
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        component='a'
        href={socialLinks.linkedin}
        aria-label='LinkedIn'
        target='_blank'
        rel='noopener noreferrer'
      >
        <LinkedInIcon />
      </IconButton>
    </>
  );

  const appBarList = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button href='#history' color='inherit'>
        history
      </Button>
      <Button href='#portfolio' color='inherit'>
        portfolio
      </Button>
    </Box>
  );

  const appBarListSocial = () => (
    <Box sx={{ display: 'flex', pl: 3 }}>
      {socialButtons()}
    </Box>
  );

  const appBarTitle = () => (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant='h6' component='div'>
        <Link href='/' color='inherit' underline='none'>
          Thomas Laurenson
        </Link>
      </Typography>
      <IconButton
        onClick={() => changeTheme()}
        aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDarkTheme ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Box>

  );

  return (
    <AppBar position='relative' css={css`z-index: ${theme.zIndex.drawer + 1};`}>
      {/* md, lg only */}
      <Box sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
        <Toolbar>
          <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {appBarTitle()}
              {appBarList()}
              {appBarListSocial()}
            </Box>
          </Container>
        </Toolbar>
      </Box>

      {/* sm only */}
      <Box sx={{display: {xs: 'none', sm: 'block', md: 'none'}}}>
        <Toolbar>
          {appBarTitle()}
          {appBarList()}
        </Toolbar>
      </Box>

      {/* xs only */}
      <Box sx={{display: {xs: 'block', sm: 'none'}}}>
        <Toolbar>
          {appBarTitle()}
          <IconButton
            edge='end'
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant='temporary'
            anchor='top'
            open={open}
            onClose={handleDrawerToggle}
          >
            {dropDownMenuList()}
          </Drawer>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

Navbar.propTypes = {
  changeTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
};

export default Navbar;
