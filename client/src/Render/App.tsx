import React, {useState, Suspense,useEffect} from 'react'
import io from 'socket.io-client';


import {useAsync} from 'react-async'
import SearchIcon from '@mui/icons-material/Search';
import {Tooltip,CircularProgress, Button,ButtonGroup, Card, CardHeader, Avatar,ThemeProvider, createTheme} from '@mui/material';
import { Canvas } from '@react-three/fiber'
import { useProgress, Html } from '@react-three/drei'

import PlayerController from './PlayerController';
import SkyBox from './Skybox'
import Terrain from './Terrain'
import SignIn from './SignIn'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Loader() {
  const { progress } = useProgress()
  return (<Html center><CircularProgress variant="determinate" value={progress} /></Html>)
}

const IsLoggedIn = async () => {
  const Response = await fetch("api/discord/getDetails", {
    method: "POST",
  })
  const Data = await Response.json()
  return Data
}
const socket = io();
function App() {
  const [Animation, setAnimation] = useState("Idle")
  const { data, error, isPending } = useAsync({ promiseFn: IsLoggedIn})
  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected")
    });

    socket.on('disconnect', () => {
      console.log("dconnected")
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  if (isPending) {
    return null
  }
  if (error) {
    return (< SignIn />)
  }
  if (data) {
    if (data.error) {
      return(< SignIn />)
    } else {

      const ic = `https://cdn.discordapp.com/avatars/${data.ID}/${data.Avatar}`
      const loggedIn = data.Username
      // socket io stuff

      return (
        <div style={{width: "100vw", height: "100vh"}}>
          <ThemeProvider  theme={darkTheme}>
          
          <Canvas>
            <hemisphereLight intensity={0.25} />
              
            <SkyBox />
            <Suspense fallback={<Loader />}>
              <Terrain position={[0,0,0]} />
              <PlayerController action={Animation} setAction={setAnimation} />
            </Suspense>
  
  
          </Canvas>
  
          <div style={{ position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: "0",
                right: "0",
                bottom: "2%",
                textAlign: "center",
                }}>
                <ButtonGroup variant="contained" aria-label="primary button group">
                    <Button color="error" onClick={() => {setAnimation("Walk")}}><SearchIcon /></Button>
                    <Button color="error" onClick={() => {setAnimation("Idle")}}>Idle</Button>
                    <Button color="error" onClick={() => {setAnimation("ChkDance")}}>Chicken Dance</Button>
                </ButtonGroup>
            </div>
  
              
  
            <Card sx={{maxWidth: 360,minWidth: 200,width: "20%",position: "absolute",top:"1%",left:"1%"}} >
            <CardHeader
              avatar={
                <Avatar src="https://github.com/DwifteJB.png" >
                </Avatar>
              }
  
              title="Spectating Dwifte"
              subheader="Last Updated 20th August 2021"
            />
  
          </Card>
          <Tooltip title={loggedIn}>
                <Avatar style={{position: "absolute",top:"2%",right:"2%"}} src={ic} >
                </Avatar>
            </Tooltip>
  
      </ThemeProvider></div>)
    }
  }

}

export default App;