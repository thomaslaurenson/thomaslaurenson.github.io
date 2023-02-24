import {createTheme} from '@mui/material/styles';
import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

let theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

theme = createTheme(theme, {
  typography: {
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 400,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'Montserrat',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          // eslint-disable-next-line quote-props
          color: 'white',
          // eslint-disable-next-line quote-props
          textDecoration: 'none',
          '&:hover': {
            color: '#4f5969',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Fix for footer scroll up button
        '.footerScrollUpButton': {
          'backgroundColor': '#121212',
          'border': '2px solid #FFFFFF1E',
          '&:hover': {
            'color': '#FFFFFF1E',
          },
        },
        '.footerContainer': {
          'backgroundColor': '#121212',
        },
        '.footer': {
          'backgroundColor': '#121212',
        },
      },
    },
  },
});

export default theme;
