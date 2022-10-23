import React, { useRef, useMemo } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useLoader } from '@react-three/fiber'

import { useTexture } from '@react-three/drei';
function Terrain(props) {
    const group = useRef()
    const materials = useLoader(MTLLoader, "/models/TerrainMaterials.mtl");
    const obj = useLoader(OBJLoader, "/models/terrain.obj", (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });
    return (
      <group ref={group} {...props} dispose={null}>
          <primitive position={[0,0,0]} object={obj} />
      </group>
    )

}

export default Terrain;