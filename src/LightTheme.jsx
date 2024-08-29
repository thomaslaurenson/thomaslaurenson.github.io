import {createTheme} from '@mui/material/styles';
import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

let LightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

LightTheme = createTheme(LightTheme, {
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
          backgroundColor: 'white',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'black',
          textDecoration: 'none',
          '&:hover': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          'color': 'black',
          '&:hover': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
  },
});

export default LightTheme;
