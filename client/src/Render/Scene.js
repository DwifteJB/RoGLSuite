import React from 'react'

import {useLoader, useThree} from '@react-three/fiber'
import { TextureLoader } from 'three'
function Scene() {
    const {scene} = useThree()
    const texture = useLoader(TextureLoader, '/imgs/skybox.png')

    scene.background = texture
    return null
}

export default Scene