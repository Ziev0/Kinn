"use client"

import type React from "react"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

type ThreeSymbolProps = {
  variant?: "dollar" | "book" | "rupee"
  className?: string
}

function Rotator({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6
  })
  return <group ref={ref}>{children}</group>
}

function Book() {
  return (
    <Rotator>
      {/* Covers */}
      <mesh position={[-0.05, 0, 0]}>
        {/* left cover */}
        <boxGeometry args={[0.1, 1.3, 1.8]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      <mesh position={[0.05, 0, 0]}>
        {/* right cover */}
        <boxGeometry args={[0.1, 1.3, 1.8]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      {/* Pages */}
      <mesh>
        <boxGeometry args={[0.1, 1.2, 1.7]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </Rotator>
  )
}

function Dollar() {
  return (
    <Rotator>
      <Text color="#ffffff" fontSize={1.4} anchorX="center" anchorY="middle">
        $
      </Text>
    </Rotator>
  )
}

function Rupee() {
  return (
    <Rotator>
      <Text color="#ffffff" fontSize={1.4} anchorX="center" anchorY="middle">
        {"₹"}
      </Text>
    </Rotator>
  )
}

export default function ThreeSymbol({ variant = "dollar", className }: ThreeSymbolProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 4]} intensity={1} />
        {variant === "book" ? <Book /> : variant === "rupee" ? <Rupee /> : <Dollar />}
      </Canvas>
    </div>
  )
}
