import {Container, Paper} from '@mui/material';
import {ThemeProvider, CssBaseline} from '@mui/material';
import theme from './theme';

import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import History from './sections/History';
import Portfolio from './sections/Portfolio';
import Footer from './sections/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Paper>
        <Container maxWidth='md'>
          <Hero />
          <About />
          <History />
          <Portfolio />
        </Container>
        <Footer />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
