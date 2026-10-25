
"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface IonParticlesProps {
  count?: number
  speed?: number
  active?: boolean
  visible?: boolean
  stageCount?: 1 | 2 | 3
  gap?: number
  color?: string
}

const STAGE_POSITIONS = [-1.35, 0, 1.35]

export default function IonParticles({
  count = 120,
  speed = 1,
  active = true,
  visible = true,
  stageCount = 3,
  gap = 0.35,
  color = "#38bdf8",
}: IonParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const animationTime = useRef(0)

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const stageIndex = index % stageCount
      const angle = index * 2.399963229728653

      const radius =
        Math.sqrt((index + 0.5) / count) * 0.62

      return {
        stageIndex,
        y: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        offset: (index * 0.61803398875) % 1,
        size: 0.65 + ((index * 7) % 5) * 0.12,
      }
    })
  }, [count, stageCount])

  useFrame((_, delta) => {
    if (!meshRef.current || !visible) return

    if (active) {
      animationTime.current +=
        Math.min(delta, 0.05) * speed
    }

    particles.forEach((particle, index) => {
      const stageX =
        STAGE_POSITIONS[particle.stageIndex]

      const progress =
        (particle.offset +
          animationTime.current * 0.35) %
        1

      const x =
        stageX - gap / 2 + progress * gap

      dummy.position.set(
        x,
        particle.y,
        particle.z
      )

      dummy.scale.setScalar(particle.size)
      dummy.updateMatrix()

      meshRef.current!.setMatrixAt(
        index,
        dummy.matrix
      )
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  if (!visible) return null

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[0.018, 8, 8]} />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.95}
        toneMapped={false}
      />
    </instancedMesh>
  )
}
