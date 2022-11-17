import Player from './Player'
import {useRef, useState} from 'react'
import CameraController from './CameraController';
import {useFrame} from '@react-three/fiber'

function PlayerController({action,setAction,PLRPOS, PLRROT}) {
    const [position, setPosition] = useState([0,0,0])
    const group = useRef()
    useFrame(() => {
        setPosition([group.current.children[0].position.x,group.current.children[0].position.y+3,group.current.children[0].position.z])
    });

    return (
        <>
        <group ref={group}>
            <Player PLRPOS={PLRPOS} PLRROT={PLRROT} action={action} setAction={setAction} >
            
            </Player></group>
        <CameraController target={position}  />
        
        </>
    )
}

export default PlayerController;