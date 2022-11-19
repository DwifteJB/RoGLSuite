import * as React from 'react';
import './css/SignIn.css';
import { Canvas } from '@react-three/fiber'
import PlayerController from './PlayerController';


import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: "#282b30",
      },
      secondary: {
        main: "#7289da",
    }
  }});
  function Copyright(props) {
    return (
      <Typography style={{position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: "0",
      right: "0",
      bottom: "10px",
      textAlign: "center"}} color="text.secondary" {...props}>
        {'Created by '} 
        <Link color="inherit" href="https://github.com/DwifteJB">
          Dwifte
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
function SignIn() {
    const [Animation, setAnimation] = React.useState("ChkDance")
    return (
    <ThemeProvider theme={darkTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}} >
              <div className='HumanoidWrapper1'>
                <Canvas>
                    <ambientLight />
                    <PlayerController action={Animation} setAction={setAnimation} ></PlayerController>
                </Canvas>
              </div>
              <div className='HumanoidWrapper2'>
                <Canvas>
                    <ambientLight />
                    <PlayerController action={Animation} setAction={setAnimation} ></PlayerController>
                </Canvas>
              </div>
              <Typography component="h1" variant="h5">
                RoGL Suite
              </Typography>
              <Box sx={{ m: 5}} />
                <Button href={"https://discord.com/api/oauth2/authorize?client_id=1033792598344732693&redirect_uri=" + process.env.PUBLIC_URL + "%2Fapi%2Fdiscord&response_type=code&scope=identify"} className="DiscordButton" variant="contained" sx={{bgcolor:'secondary.main'}}>
                  Sign in with discord
                </Button>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
}
export default SignIn