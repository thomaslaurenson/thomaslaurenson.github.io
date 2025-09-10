import { createTheme } from '@mui/material/styles';
import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

const createCustomTheme = (mode) => {
  let theme = createTheme({
    palette: {
      mode,
    },
  });

  // Shared configuration
  const sharedConfig = {
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
            ...(mode === 'light' && {
              backgroundColor: 'white',
            }),
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? 'black' : 'white',
            textDecoration: 'none',
            '&:hover': {
              color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : '#4f5969',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            ...(mode === 'light' && {
              color: 'black',
            }),
            '&:hover': {
              color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : '#4f5969',
            },
          },
        },
      },
      ...(mode === 'dark' && {
        MuiCssBaseline: {
          styleOverrides: {
            '.footer': {
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
            },
          },
        },
      }),
    },
  };

  return createTheme(theme, sharedConfig);
};

export default createCustomTheme;
