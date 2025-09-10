import React from 'react';
import {
  Container,
  Paper,
  Box,
  Fade,
  Fab,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';

import LightTheme from './LightTheme';
import DarkTheme from './DarkTheme';
import Navbar from './Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import History from './sections/History';
import Portfolio from './sections/Portfolio';
import Footer from './sections/Footer';
import { useThemeMode } from './hooks/useThemeMode';
import { useScrollToTop } from './hooks/useScrollToTop';

function ScrollTop(props) {
  const {children} = props;
  const { trigger, scrollToTop } = useScrollToTop();

  return (
    <Fade in={trigger}>
      <Box
        onClick={scrollToTop}
        role="presentation"
        sx={{position: 'fixed', bottom: 16, right: 16}}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};

function App(props) {
  const { isDarkTheme, toggleTheme } = useThemeMode();

  return (
    <ThemeProvider theme={isDarkTheme ? DarkTheme : LightTheme}>
      <CssBaseline />
      <Navbar changeTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <Paper>
        <Box id="scroll-up-anchor">
          <Container maxWidth="md">
            <Hero />
            <About />
            <History />
            <Portfolio />
          </Container>
        </Box>
        <Footer />
      </Paper>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
}

export default App;
