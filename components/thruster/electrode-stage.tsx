
"use client"

import { useMemo } from "react"
import * as THREE from "three"

export interface ElectrodeStageProps {
  position?: [number, number, number]
  radius?: number
  gap?: number
  active?: boolean
  showMesh?: boolean
  exploded?: boolean
  stageNumber?: number
}

export default function ElectrodeStage({
  position = [0, 0, 0],
  radius = 0.72,
  gap = 0.4,
  active = true,
  showMesh = true,
  exploded = false,
  stageNumber = 1,
}: ElectrodeStageProps) {
  const emitterX = -gap / 2
  const collectorX = gap / 2 + (exploded ? 0.35 : 0)

  const meshLines = useMemo(() => {
    const lines: [number, number][] = []
    const count = 11

    for (let i = -count; i <= count; i++) {
      const offset = (i / count) * radius
      const halfLength = Math.sqrt(
        Math.max(0, radius * radius - offset * offset)
      )

      lines.push([offset, halfLength])
    }

    return lines
  }, [radius])

  return (
    <group position={position}>
      {/* Emitter support ring */}
      <mesh
        position={[emitterX, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <torusGeometry args={[radius, 0.025, 10, 64]} />
        <meshStandardMaterial
          color="#e0a54c"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Thin emitter wire across the duct */}
      <mesh position={[emitterX, 0, 0]}>
        <cylinderGeometry args={[0.009, 0.009, radius * 1.9, 8]} />
        <meshStandardMaterial
          color={active ? "#ffb547" : "#64748b"}
          emissive={active ? "#d97706" : "#000000"}
          emissiveIntensity={active ? 0.65 : 0}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Insulators at emitter wire ends */}
      {[-1, 1].map((side) => (
        <mesh
          key={`insulator-${side}`}
          position={[emitterX, side * radius * 0.94, 0]}
        >
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#f1f5f9"
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Collector support ring */}
      <mesh
        position={[collectorX, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <torusGeometry args={[radius, 0.032, 12, 64]} />
        <meshStandardMaterial
          color="#36c4a2"
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>

      {/* Collector mesh grid */}
      {showMesh && (
        <group position={[collectorX, 0, 0]}>
          {meshLines.map(([offset, halfLength], index) => (
            <group key={`grid-${index}`}>
              {/* Vertical grid wire */}
              <mesh position={[0, 0, offset]}>
                <cylinderGeometry
                  args={[0.006, 0.006, halfLength * 2, 6]}
                />
                <meshStandardMaterial
                  color="#78e4cc"
                  metalness={0.8}
                  roughness={0.25}
                />
              </mesh>

              {/* Horizontal grid wire */}
              <mesh
                position={[0, offset, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <cylinderGeometry
                  args={[0.006, 0.006, halfLength * 2, 6]}
                />
                <meshStandardMaterial
                  color="#78e4cc"
                  metalness={0.8}
                  roughness={0.25}
                />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* Emitter terminal */}
      <mesh
        position={[emitterX, radius + 0.12, 0]}
      >
        <boxGeometry args={[0.12, 0.16, 0.12]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} />
      </mesh>

      {/* Collector terminal */}
      <mesh
        position={[collectorX, radius + 0.12, 0]}
      >
        <boxGeometry args={[0.12, 0.16, 0.12]} />
        <meshStandardMaterial color="#059669" metalness={0.8} />
      </mesh>

      {/* Stage number marker */}
      <mesh
        position={[emitterX, -radius - 0.1, 0]}
      >
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial
          color={
            stageNumber === 1
              ? "#38bdf8"
              : stageNumber === 2
                ? "#a78bfa"
                : "#f472b6"
          }
        />
      </mesh>
    </group>
  )
}
