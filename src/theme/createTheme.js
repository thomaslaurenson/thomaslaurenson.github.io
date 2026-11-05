import { createTheme, alpha } from '@mui/material/styles';
import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import colorRoles from './colorRoles';

// Maps Material 3 (https://m3.material.io) color roles, type scale, shape
// and state layers onto MUI, which is built on Material 2.

// Type scale: https://m3.material.io/styles/typography/type-scale-tokens
const typeScale = (size, lineHeight, weight, tracking) => ({
  fontSize: `${size / 16}rem`,
  lineHeight: `${lineHeight / 16}rem`,
  fontWeight: weight,
  letterSpacing: `${tracking / 16}rem`,
});

// Shape: https://m3.material.io/styles/shape/corner-radius-scale
const corner = {
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  full: 9999,
};

// States: https://m3.material.io/foundations/interaction/states/state-layers
const stateLayer = {
  hover: 0.08,
  focus: 0.1,
  pressed: 0.1,
};

// Applies a state layer on top of an existing container color.
const stateLayerImage = (color, opacity) =>
  `linear-gradient(${alpha(color, opacity)}, ${alpha(color, opacity)})`;

const createCustomTheme = (mode) => {
  const c = colorRoles[mode];

  return createTheme({
    palette: {
      mode,
      primary: { main: c.primary, contrastText: c.onPrimary },
      secondary: { main: c.secondary, contrastText: c.onSecondary },
      error: { main: c.error, contrastText: c.onError },
      background: { default: c.surface, paper: c.surface },
      text: { primary: c.onSurface, secondary: c.onSurfaceVariant },
      divider: c.outlineVariant,
      action: {
        active: c.onSurfaceVariant,
        hover: alpha(c.onSurface, stateLayer.hover),
        hoverOpacity: stateLayer.hover,
        focus: alpha(c.onSurface, stateLayer.focus),
        focusOpacity: stateLayer.focus,
        activatedOpacity: stateLayer.pressed,
        disabled: alpha(c.onSurface, 0.38),
        disabledBackground: alpha(c.onSurface, 0.12),
      },
      // All Material 3 roles, for anything the MUI palette has no slot for.
      m3: c,
    },
    shape: {
      borderRadius: corner.extraSmall,
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif',
      h1: typeScale(57, 64, 400, -0.25), // display large
      h2: typeScale(45, 52, 400, 0), // display medium
      h3: typeScale(36, 44, 400, 0), // display small
      h4: typeScale(32, 40, 400, 0), // headline large
      h5: typeScale(24, 32, 400, 0), // headline small
      h6: typeScale(22, 28, 400, 0), // title large
      subtitle1: typeScale(16, 24, 500, 0.15), // title medium
      subtitle2: typeScale(14, 20, 500, 0.1), // title small
      body1: typeScale(16, 24, 400, 0.5), // body large
      body2: typeScale(14, 20, 400, 0.25), // body medium
      caption: typeScale(12, 16, 400, 0.4), // body small
      button: { ...typeScale(14, 20, 500, 0.1), textTransform: 'none' }, // label large
      overline: typeScale(11, 16, 500, 0.5), // label small
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // Focus indicator: 3dp, secondary color, 2dp outer offset.
          ':focus-visible': {
            outline: `3px solid ${c.secondary}`,
            outlineOffset: '2px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          // Material 3 uses tonal surface containers, not dark-mode overlays.
          root: { backgroundImage: 'none' },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'inherit' },
        styleOverrides: {
          root: { backgroundColor: c.surface, color: c.onSurface },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundColor: c.surfaceContainerLow },
        },
      },
      // Outlined card: surface, outline variant border, medium corners.
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: corner.medium,
            backgroundColor: c.surface,
            borderColor: c.outlineVariant,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: corner.full,
            minHeight: 40,
            paddingLeft: 12,
            paddingRight: 12,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { color: c.onSurfaceVariant },
        },
      },
      // Assist chip: small corners, outline variant border.
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: corner.small,
            height: 32,
            ...typeScale(14, 20, 500, 0.1),
            color: c.onSurface,
          },
          outlined: { borderColor: c.outlineVariant },
        },
      },
      // Small FAB: primary container, medium corners.
      MuiFab: {
        styleOverrides: {
          root: {
            borderRadius: corner.medium,
            backgroundColor: c.primaryContainer,
            color: c.onPrimaryContainer,
            '&:hover': {
              backgroundColor: c.primaryContainer,
              backgroundImage: stateLayerImage(c.onPrimaryContainer, stateLayer.hover),
            },
          },
        },
      },
      MuiLink: {
        defaultProps: { underline: 'hover' },
      },
    },
  });
};

export default createCustomTheme;
