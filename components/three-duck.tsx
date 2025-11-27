"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type { Group } from "three"

function Duck() {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const ref = useRef<Group>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.4
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.03
  })
  return <primitive ref={ref} object={scene} scale={1.3} />
}

export function ThreeDuck() {
  return (
    <Canvas camera={{ position: [0, 0.6, 2.4], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 2]} intensity={1.1} />
        <Duck />
        <Environment preset="studio" />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload("/assets/3d/duck.glb")
