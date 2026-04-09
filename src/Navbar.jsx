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
        <Link href='#history'>
          <ListItem style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              history
            </Typography>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href='#portfolio'>
          <ListItem style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              portfolio
            </Typography>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1, pb: 1 }}>
        <Box sx={{ p: 2, display: 'inline' }}>
          <Link href={socialLinks.email} aria-label='Email Link'>
            <EmailIcon fontSize='small' />
          </Link>
        </Box>
        <Box sx={{ p: 2, display: 'inline' }}>
          <Link href={socialLinks.github} aria-label='GitHub Link' target='_blank' rel='noopener noreferrer'>
            <GitHubIcon fontSize='small' />
          </Link>
        </Box>
        <Box sx={{ p: 2, display: 'inline' }}>
          <Link href={socialLinks.linkedin} aria-label='LinkedIn Link' target='_blank' rel='noopener noreferrer'>
            <LinkedInIcon />
          </Link>
        </Box>
      </Box>
    </div>
  );

  const appBarList = () => (
    <div>
      <Box sx={{ display: 'inline-block', p: 1 }}>
        <Typography variant='h6' sx={{ fontWeight: 700 }}>
          <Link href='#history'>
            history
          </Link>
        </Typography>
      </Box>
      <Box sx={{ display: 'inline-block', p: 1 }}>
        <Typography variant='h6' sx={{ fontWeight: 700 }}>
          <Link href='#portfolio'>
            portfolio
          </Link>
        </Typography>
      </Box>
    </div>
  );

  const appBarListSocial = () => (
    <div>
      <Box sx={{ p: 1, pl: 4, display: 'inline' }}>
        <Link href={socialLinks.email} aria-label='Email Link'>
          <EmailIcon fontSize='large' />
        </Link>
      </Box>
      <Box sx={{ p: 1, display: 'inline' }}>
        <Link href={socialLinks.github} aria-label='GitHub Link' target='_blank' rel='noopener noreferrer'>
          <GitHubIcon fontSize='large' />
        </Link>
      </Box>
      <Box sx={{ p: 1, display: 'inline' }}>
        <Link href={socialLinks.linkedin} aria-label='LinkedIn Link' target='_blank' rel='noopener noreferrer'>
          <LinkedInIcon fontSize='large' />
        </Link>
      </Box>
    </div>
  );

  const appBarTitle = () => (
    <Box sx={{flexGrow: 1}}>
      <Typography variant='h5' >
        <Link href='/'>
          Thomas Laurenson
        </Link>
        <Box sx={{ display: 'inline', pl: 2 }}>
          {isDarkTheme ? (
            <LightMode
              fontSize='small'
              onClick={() => changeTheme()}
            />
          ) : (
            <DarkMode
              fontSize='small'
              onClick={() => changeTheme()}
            />
          )
          }
        </Box>
      </Typography>
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
            edge='start'
            color='inherit'
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
