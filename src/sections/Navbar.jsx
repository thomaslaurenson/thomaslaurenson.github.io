/** @jsxImportSource @emotion/react */
import React from 'react';
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
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const social = {
    email: `mailto:thomas@thomaslaurenson.com`,
    linkedin: `https://www.linkedin.com/in/thomaslaurenson`,
    github: `https://github.com/thomaslaurenson`,
  };

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
      <List>
        <Link href='#history'>
          <ListItem style={{display: 'flex', justifyContent: 'center'}}>
            <Box fontWeight='fontWeightBold'>
              {' '}
              <Typography variant='h6'>
                history
              </Typography>
            </Box>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href='#portfolio'>
          <ListItem style={{display: 'flex', justifyContent: 'center'}}>
            <Box fontWeight='fontWeightBold'>
              {' '}
              <Typography variant='h6'>
                portfolio
              </Typography>
            </Box>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Box
        display='flex'
        justifyContent='center'
        justifyItems='center'
        pt={1}
        pb={1}
      >
        <Box p={2} display='inline'>
          <Link href={social?.email} aria-label='Email Link'>
            <EmailIcon fontSize='small' />
          </Link>
        </Box>
        <Box p={2} display='inline'>
          <Link href={social?.github} aria-label='GitHub Link'>
            <GitHubIcon fontSize='small' />
          </Link>
        </Box>
        <Box p={2} display='inline'>
          <Link href={social?.linkedin} aria-label='LinkenIn Link'>
            <LinkedInIcon />
          </Link>
        </Box>
      </Box>
    </div>
  );

  const appBarList = () => (
    <div>
      <Box display='inline-block' p={1} fontWeight='fontWeightBold'>
        <Typography variant='h6'>
          <Link href='#history'>
            history
          </Link>
        </Typography>
      </Box>
      <Box
        display='inline-block'
        p={1}
        fontWeight='fontWeightBold'
      >
        <Typography variant='h6'>
          <Link href='#portfolio'>
            portfolio
          </Link>
        </Typography>
      </Box>
    </div>
  );

  const appBarListSocial = () => (
    <div>
      <Box pl={4} p={1} display='inline'>
        <Link href={social?.email} aria-label='Email Link'>
          <EmailIcon fontSize='large' />
        </Link>
      </Box>
      <Box p={1} display='inline'>
        <Link href={social?.github} aria-label='GitHub Link'>
          <GitHubIcon fontSize='large' />
        </Link>
      </Box>
      <Box p={1} display='inline'>
        <Link href={social?.linkedin} aria-label='LinkedIn Link'>
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
      </Typography>
    </Box>

  );

  return (
    <div>
      <AppBar position='relative' css={css`z-index: 1400;`}>
        {/* md, lg only */}
        <Box sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
          <Toolbar>
            <Container maxWidth='lg'>
              <Box display='flex' alignItems='center'>
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
            // classes={{paper: `css=overflow: 'auto';`}}
            >
              {dropDownMenuList()}
            </Drawer>
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
};

export default Navbar;
