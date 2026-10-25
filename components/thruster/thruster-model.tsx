
"use client"

import * as THREE from "three"
import ElectrodeStage from "./electrode-stage"

export interface ThrusterModelProps {
  exploded?: boolean
  transparent?: boolean
  showMesh?: boolean
  active?: boolean
  stageCount?: 1 | 2 | 3
  gap?: number
}

export default function ThrusterModel({
  exploded = false,
  transparent = true,
  showMesh = true,
  active = true,
  stageCount = 3,
  gap = 0.3,
}: ThrusterModelProps) {
  const radius = 0.85
  const length = 4.6

  const stagePositions = [-1.35, 0, 1.35]

  return (
    <group>
      {/* HOUSING AND EXTERNAL STRUCTURE */}
      {/* Hidden during exploded inspection */}

      {!exploded && (
        <group>
          {/* Main cylindrical housing */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry
              args={[
                radius,
                radius,
                length,
                64,
                1,
                true,
              ]}
            />

            <meshStandardMaterial
              color="#8fa9bb"
              transparent={transparent}
              opacity={transparent ? 0.14 : 1}
              metalness={0.35}
              roughness={0.45}
              side={THREE.DoubleSide}
              depthWrite={!transparent}
            />
          </mesh>

          {/* Inlet and outlet structural rings */}
          {[-length / 2, length / 2].map(
            (x, index) => (
              <mesh
                key={`duct-ring-${index}`}
                position={[x, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
              >
                <torusGeometry
                  args={[radius, 0.055, 12, 64]}
                />

                <meshStandardMaterial
                  color="#94a3b8"
                  metalness={0.8}
                  roughness={0.3}
                />
              </mesh>
            )
          )}

          {/* Bell-mouth inlet */}
          <mesh
            position={[
              -length / 2 - 0.23,
              0,
              0,
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry
              args={[
                radius,
                radius * 1.22,
                0.45,
                64,
                1,
                true,
              ]}
            />

            <meshStandardMaterial
              color="#64748b"
              transparent={transparent}
              opacity={transparent ? 0.3 : 1}
              metalness={0.6}
              roughness={0.35}
              side={THREE.DoubleSide}
              depthWrite={!transparent}
            />
          </mesh>

          {/* External support rails */}
          {[-1, 1].map((side) => (
            <mesh
              key={`rail-${side}`}
              position={[
                0,
                -radius * 0.8,
                side * radius * 0.5,
              ]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry
                args={[
                  0.025,
                  0.025,
                  length,
                  10,
                ]}
              />

              <meshStandardMaterial
                color="#475569"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          ))}

          {/* Base supports */}
          {[-1.5, 1.5].map((x, index) => (
            <mesh
              key={`support-${index}`}
              position={[x, -1.02, 0]}
            >
              <boxGeometry
                args={[0.18, 0.42, 0.6]}
              />

              <meshStandardMaterial
                color="#334155"
                metalness={0.5}
                roughness={0.45}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* ELECTRODE STAGES */}
      {stagePositions
        .slice(0, stageCount)
        .map((x, index) => {
          const explodedOffset = exploded
            ? (
                index -
                (stageCount - 1) / 2
              ) * 0.75
            : 0

          return (
            <ElectrodeStage
              key={`stage-${index}`}
              position={[
                x + explodedOffset,
                0,
                0,
              ]}
              radius={0.7}
              gap={gap}
              active={active}
              showMesh={showMesh}
              exploded={exploded}
              stageNumber={index + 1}
            />
          )
        })}
    </group>
  )
}
