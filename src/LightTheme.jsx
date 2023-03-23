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
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          // eslint-disable-next-line quote-props
          color: 'black',
          // eslint-disable-next-line quote-props
          textDecoration: 'none',
          '&:hover': {
            color: '#87ceeb',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#87ceeb',
          },
        },
      },
    },
  },
});

export default LightTheme;
