import React, {useState, Suspense, useEffect} from 'react'

import {CircularProgress, Button,ButtonGroup, Card, CardHeader, Avatar,ThemeProvider, createTheme} from '@mui/material';
import { Canvas } from '@react-three/fiber'
import { useProgress, Html, useAnimations } from '@react-three/drei'
import PlayerController from './PlayerController';
import SkyBox from './Skybox'
import Terrain from './Terrain'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Loader() {
  const { progress } = useProgress()
  return (<Html center><CircularProgress variant="determinate" value={progress} /></Html>)
}
function App() {
  const [Animation, setAnimation] = useState("Idle")

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
              bottom: "10px",
              textAlign: "center",
              }}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button color="error" onClick={() => {setAnimation("Walk")}}>Walk</Button>
                  <Button color="error" onClick={() => {setAnimation("Idle")}}>Idle</Button>
                  <Button color="error" onClick={() => {setAnimation("ChkDance")}}>Chicken Dance</Button>
              </ButtonGroup>
          </div>

          <div style={{ position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: "0",
              right: "0",
              top: "10px",
              textAlign: "center",
              }}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button color="error" onClick={() => {setAnimation("Walk")}}>Walk</Button>
                  <Button color="error" onClick={() => {setAnimation("Idle")}}>Idle</Button>
                  <Button color="error" onClick={() => {setAnimation("ChkDance")}}>Chicken Dance</Button>
              </ButtonGroup>
          </div>
            

          <Card style={{position: "absolute",top:"20px",left:"10px"}} variant="outlined">
          <CardHeader
            avatar={
              <Avatar  src='https://tr.rbxcdn.com/bfb4ef9da88083f250b9204922cf555a/150/150/AvatarHeadshot/Png' >
              </Avatar>
            }

            title="Dwifte"
            subheader="December 31, 2022"
          />

        </Card>
    </ThemeProvider></div>)
}

export default App;