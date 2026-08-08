import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import React, { useMemo, useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isNative } from '../../../utils/platform';

const generateMuiTheme = (theme) => createTheme({
  palette: {
    primary: {
      main: theme?.primaryColor || "#666cff",
      light: '#e6e6fe',
      text: {
        main: theme?.textColor || "#262b43",
        buttonText: theme?.textColor || "#ffffff",
        light: '#BEC0C7',
        contrastText: '#262b43',
      },
      icon: theme?.iconColor || '#262b43',
      background: {
        sideNavigationBgColor: theme?.sideNavigationBgColor || '',
        contentBgColor: theme?.contentBgColor || '',
        contentBgColor2: theme?.contentBgColor2 || '',
        headerBgColor: theme?.headerBgColor || '',
      }
    },
    secondary: {
      main: '#cfd0d6',
      light: '#BEC0C7',
      // contrastText: '#262b43',
    },
    text: {
      primary: '#262b43',
      secondary: '#666cff',
      // disabled: '#BEC0C7',
    },
    error: {
      main: '#FF4D66',
      // contrastText: '#ffffff',
    },
    warning: {
      main: '#ffed65',
      // contrastText: '#ffffff',
    },
    success: {
      main: '#16a34a',
    },
    background: {
      default: '#F5F5F7',
      paper: '#ffffff',
    },
    table: {
      header: '#f5f5f7',
    },
    action: {
      hover: '#f5f5f7',
      selected: '#e6e6fe',
    },
  },
});

const MuiThemeProvider = ({ theme, children }) => {

  const muiTheme = useMemo(() => generateMuiTheme(theme), [theme]);

  useEffect(() => {
    if (isNative()) {
      const headerColor = theme?.headerBgColor || '#ffffff';
      
      // Update background color to match header
      StatusBar.setBackgroundColor({ color: headerColor }).catch(err => console.warn(err));
      
      // Detect if color is dark to set appropriate text color (light vs dark icons)
      const isDark = (color) => {
        if (!color) return false;
        const hex = color.replace('#', '');
        if (hex.length === 3) {
          const r = parseInt(hex.substring(0, 1), 16) * 17;
          const g = parseInt(hex.substring(1, 2), 16) * 17;
          const b = parseInt(hex.substring(2, 3), 16) * 17;
          return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
        }
        if (hex.length === 6) {
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
        }
        return false;
      };

      StatusBar.setStyle({
        style: isDark(headerColor) ? Style.Light : Style.Dark
      }).catch(err => console.warn(err));
    }
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  theme: state.common.theme,
});

export default connect(mapStateToProps)(MuiThemeProvider);