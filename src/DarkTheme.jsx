import {createTheme} from '@mui/material/styles';
import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

let DarkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

DarkTheme = createTheme(DarkTheme, {
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
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            color: '#4f5969',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#4f5969',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '.footer': {
          'backgroundImage': 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
        },
      },
    },
  },
});

export default DarkTheme;
