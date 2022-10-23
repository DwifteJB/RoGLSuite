import { useThree } from "@react-three/fiber";
import {
  CubeTextureLoader,
} from "three";
function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
      "/imgs/skybox/RT.png", // left
      "/imgs/skybox/LF.png", // right
      "/imgs/skybox/UP.png", // top
      "/imgs/skybox/DN.png", // down
      "/imgs/skybox/BK.png", // back
      "/imgs/skybox/FT.png", // front
    ]);
  
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
  }

export default SkyBox