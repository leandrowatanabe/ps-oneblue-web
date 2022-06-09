import * as React from 'react'
import './App.css';
import Pages from './routes';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import oneBlueLogo from './assets/logo/one-blue-logo.png'
const theme = createTheme({
  palette: {
      primary:{
        main: '#42a5f5',
        contrast: '#ffffff'
      }
  },
});


function Copyright(props) {
  return (
        <Typography variant="body2" color='primary.contrast' align="center" margin='0' {...props}>
        {'Autor '}
        <Link color="inherit" href="https://www.linkedin.com/in/leandro-watanabe-096896160/">
            Leandro Watanabe
        </Link>{' - '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
  );
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
              <Box component="main"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'primary.main',
                  height:'100vh',
                  width: 'auto',
              }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                    <Link color="inherit" href="https://oneblue.io/">
                      <img src={oneBlueLogo} alt='Logotipo da One Blue' height="75vh" />
                    </Link>
                  
                </Box>

                <Pages />
                
                <Copyright sx={{ mt: 5, marginY:'1vh'}} />
              </Box>

    </ThemeProvider>


  );
}

export default App;
