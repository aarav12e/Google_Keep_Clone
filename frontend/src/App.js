import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import Home from './components/Home';
import DataProvider from './context/DataProvider';

const muiThemes = {
  emerald: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#6366f1' },
      secondary: { main: '#06b6d4' },
      background: { default: '#f8fafc', paper: '#ffffff' },
    },
    typography: {
      fontFamily: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'].join(','),
    },
  }),
  night: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#818cf8' },
      secondary: { main: '#22d3ee' },
      background: { default: '#0f172a', paper: '#1e293b' },
    },
    typography: {
      fontFamily: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'].join(','),
    },
  }),
  cyberpunk: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#ff00ff' },
      secondary: { main: '#00e1ff' },
      background: { default: '#ffee00', paper: '#ffffff' },
    },
    typography: {
      fontFamily: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'].join(','),
    },
  }),
  garden: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#5c7f67' },
      secondary: { main: '#ecad29' },
      background: { default: '#e9e7e7', paper: '#ffffff' },
    },
    typography: {
      fontFamily: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'].join(','),
    },
  }),
};

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('keep-clone-theme') || 'emerald';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('keep-clone-theme', currentTheme);
  }, [currentTheme]);

  const muiTheme = muiThemes[currentTheme] || muiThemes.emerald;

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <DataProvider>
        <Home currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
