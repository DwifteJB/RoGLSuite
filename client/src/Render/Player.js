
import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import {animated, useSpring} from '@react-spring/three'

function Player({action,setAction,PLRPOS,PLRROT}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/rigged-anims.glb')
  const { actions } = useAnimations(animations, group)
  const { position } = useSpring({
    position: PLRPOS,
    config: {duration:150}
  });
  const PreviousAction = usePrevious(action)
  useEffect(() => {
    if (PreviousAction) {
      actions[PreviousAction].stop()
    }

    actions[action].play()
  },[action,actions]);
  return (
    <animated.group ref={group} rotation={PLRROT} position={position} dispose={null}>
      <group name="Scene">
        <group name="Walking" position={[0.02, 1.79, -0.03]} rotation={[0,0,0]}>
          <primitive object={nodes.Master} />
          <skinnedMesh name="R15101" geometry={nodes.R15101.geometry} material={materials.Tex} skeleton={nodes.R15101.skeleton} />
          <skinnedMesh name="R151010" geometry={nodes.R151010.geometry} material={materials.Tex} skeleton={nodes.R151010.skeleton} />
          <skinnedMesh name="R151011" geometry={nodes.R151011.geometry} material={materials.Tex} skeleton={nodes.R151011.skeleton} />
          <skinnedMesh name="R151012" geometry={nodes.R151012.geometry} material={materials.Tex} skeleton={nodes.R151012.skeleton} />
          <skinnedMesh name="R151013" geometry={nodes.R151013.geometry} material={materials.Tex} skeleton={nodes.R151013.skeleton} />
          <skinnedMesh name="R151014" geometry={nodes.R151014.geometry} material={materials.Tex} skeleton={nodes.R151014.skeleton} />
          <skinnedMesh name="R151015" geometry={nodes.R151015.geometry} material={materials.Tex} skeleton={nodes.R151015.skeleton} />
          <skinnedMesh name="R15102" geometry={nodes.R15102.geometry} material={materials.Tex} skeleton={nodes.R15102.skeleton} />
          <skinnedMesh name="R15103" geometry={nodes.R15103.geometry} material={materials.Tex} skeleton={nodes.R15103.skeleton} />
          <skinnedMesh name="R15104" geometry={nodes.R15104.geometry} material={materials.Tex} skeleton={nodes.R15104.skeleton} />
          <skinnedMesh name="R15105" geometry={nodes.R15105.geometry} material={materials.Tex} skeleton={nodes.R15105.skeleton} />
          <skinnedMesh name="R15106" geometry={nodes.R15106.geometry} material={materials.Tex} skeleton={nodes.R15106.skeleton} />
          <skinnedMesh name="R15107" geometry={nodes.R15107.geometry} material={materials.Tex} skeleton={nodes.R15107.skeleton} />
          <skinnedMesh name="R15108" geometry={nodes.R15108.geometry} material={materials.Tex} skeleton={nodes.R15108.skeleton} />
          <skinnedMesh name="R15109" geometry={nodes.R15109.geometry} material={materials.Tex} skeleton={nodes.R15109.skeleton} />
        </group>
      </group>
    </animated.group>
  )
}

useGLTF.preload('/Models/rigged-anims.glb')

export default Player;

function usePrevious(v) {
  const ref = useRef()

  useEffect(() => {
    ref.current = v
  }, [v])

  return ref.current
}