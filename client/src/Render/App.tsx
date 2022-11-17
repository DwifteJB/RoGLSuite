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


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}


function formatDate(date: Date) {
  return (
      [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
      ].join(':')
  );
}



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

  const [ Rotation, setRotation ]= useState([0,0,0])
  const [ Position, setPos ]= useState([0,69,0])
  const [ SpecInfo, setSpecInfo ] = useState({avatar:"https://github.com/DwifteJB.png",username:"DwifteJB",lastseen:"UNKNOWN"})

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected")
      socket.emit("plr-update",{
        "Search": "136244389",
        "Param": "ID"
      })
    });

    socket.on("PositionUpdate", (data) => {
      let date = Date.parse()
      let fd = formatDate(date)
      console.log(fd)
      setPos([data.Position.X,data.Position.Y,data.Position.Z])
      setAnimation("Walk")
      setRotation([data.Rotation.X,data.Rotation.Y,data.Rotation.Z])
      setSpecInfo({avatar:"https://github.com/DwifteJB.png",username:data.Name,lastseen:data.lastseen})
    });

    socket.on("SignOut", () => {
      localStorage.removeItem("_ROGL_ACCESS")
      window.location.href = "/"
    });

    socket.on('disconnect', () => {
      console.log("dconnected")
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off("SignOut");
      socket.off("PositionUpdate");
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
            <hemisphereLight intensity={0.35} />
              
            <SkyBox />
            <Suspense fallback={<Loader />}>
              <Terrain position={[0,0,0]} />
              <PlayerController PLRROT={Rotation} PLRPOS={Position} action={Animation} setAction={setAnimation} />
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
                <Avatar src={SpecInfo.avatar} >
                </Avatar>
              }
  
              title={"Spectating " + SpecInfo.username}
              subheader={"Last updated "+ SpecInfo.lastseen}
            />
  
          </Card>
          <Tooltip title={"Logged in as " + loggedIn}>
                <Avatar style={{position: "absolute",top:"2%",right:"2%"}} src={ic} >
                </Avatar>
            </Tooltip>
  
      </ThemeProvider></div>)
    }
  }

}

export default App;