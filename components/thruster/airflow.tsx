
"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface AirflowProps {
  visible?: boolean
  active?: boolean
  speed?: number
  particleCount?: number
  showStreamlines?: boolean
}

const DUCT_START = -2.55
const DUCT_END = 2.3
const DUCT_LENGTH = DUCT_END - DUCT_START

export default function Airflow({
  visible = true,
  active = true,
  speed = 1,
  particleCount = 90,
  showStreamlines = true,
}: AirflowProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const animationTime = useRef(0)

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    return Array.from(
      { length: particleCount },
      (_, index) => {
        const angle = index * 2.399963229728653

        const radius =
          Math.sqrt((index + 0.5) / particleCount) *
          0.67

        return {
          y: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius,
          offset: (index * 0.754877666) % 1,
          size: 0.65 + (index % 4) * 0.12,
        }
      }
    )
  }, [particleCount])

  const streamlines = useMemo(() => {
    const lines: THREE.Vector3[][] = []

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 0.35 + (i % 3) * 0.13

      const points: THREE.Vector3[] = []

      for (let j = 0; j <= 40; j++) {
        const progress = j / 40

        const x =
          DUCT_START + progress * DUCT_LENGTH

        points.push(
          new THREE.Vector3(
            x,
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
          )
        )
      }

      lines.push(points)
    }

    return lines
  }, [])

  
useFrame((_, delta) => {
  if (!meshRef.current || !visible) return

  if (active) {
    animationTime.current += Math.min(delta, 0.05) * speed
  }

  particles.forEach((particle, index) => {
    const progress =
      (particle.offset + animationTime.current * 0.12) % 1

    const x = DUCT_START + progress * DUCT_LENGTH

    dummy.position.set(x, particle.y, particle.z)
    dummy.scale.setScalar(particle.size)
    dummy.updateMatrix()

    meshRef.current!.setMatrixAt(index, dummy.matrix)
  })

  meshRef.current.instanceMatrix.needsUpdate = true
})


  if (!visible) return null

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, particleCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.012, 6, 6]} />

        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.65}
          toneMapped={false}
        />
      </instancedMesh>

      {showStreamlines &&
        streamlines.map((points, index) => (
          <mesh key={index}>
            <tubeGeometry
              args={[
                new THREE.CatmullRomCurve3(points),
                40,
                0.003,
                4,
                false,
              ]}
            />

            <meshBasicMaterial
              color="#0ea5e9"
              transparent
              opacity={0.22}
            />
          </mesh>
        ))}
    </group>
  )
}
