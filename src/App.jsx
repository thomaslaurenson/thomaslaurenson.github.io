import {Container, Paper, Box, Fade, Fab} from '@mui/material';
import {ThemeProvider, CssBaseline} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';

import theme from './theme';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import History from './sections/History';
import Portfolio from './sections/Portfolio';
import Footer from './sections/Footer';

function ScrollTop(props) {
  const {children} = props;
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
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
