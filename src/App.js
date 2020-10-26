import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import Routes from './routes/index';

const theme = createMuiTheme({
  palette: {
    background: {
      //default: "#2d2929"
    },
    primary: {
      main: "#202020",
    },
    secondary: {
      main: "#f8f5f3",
    },
  }
});

const  App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );
}

export default App;
