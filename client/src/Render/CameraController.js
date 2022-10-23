import { OrbitControls } from "@react-three/drei";

function CameraController(props) {
    return (
        <OrbitControls 
        
        {...props}
        enableZoom={false}
        enablePan={false}
        enableRotate={true} 
        maxZoom={10}
        minZoom={10}
        maxDistance={10}
        minDistance={10}
        makeDefault
        />
    )
}


export default CameraController;