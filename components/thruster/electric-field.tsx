
"use client"

import { useMemo } from "react"
import * as THREE from "three"

interface ElectricFieldProps {
  visible?: boolean
  stageCount?: 1 | 2 | 3
  gap?: number
  intensity?: number
  color?: string
}

const STAGE_POSITIONS = [-1.35, 0, 1.35]

function FieldStage({
  positionX,
  gap,
  intensity,
  color,
}: {
  positionX: number
  gap: number
  intensity: number
  color: string
}) {
  const fieldLines = useMemo(() => {
    const curves: THREE.CatmullRomCurve3[] = []

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 0.12 + (i % 3) * 0.15

      const points: THREE.Vector3[] = []

      for (let j = 0; j <= 24; j++) {
        const t = j / 24

        const x = -gap / 2 + t * gap

        const spread =
          radius +
          Math.sin(t * Math.PI) * 0.035

        points.push(
          new THREE.Vector3(
            x,
            Math.cos(angle) * spread,
            Math.sin(angle) * spread
          )
        )
      }

      curves.push(
        new THREE.CatmullRomCurve3(points)
      )
    }

    return curves
  }, [gap])

  return (
    <group position={[positionX, 0, 0]}>
      {fieldLines.map((curve, index) => {
        const point = curve.getPoint(0.65)

        const tangent = curve
          .getTangent(0.65)
          .normalize()

        return (
          <group key={index}>
            <mesh>
              <tubeGeometry
                args={[curve, 32, 0.004, 5, false]}
              />

              <meshBasicMaterial
                color={color}
                transparent
                opacity={Math.min(
                  0.85,
                  0.2 + intensity * 0.3
                )}
              />
            </mesh>

            <arrowHelper
              args={[
                tangent,
                point,
                0.09,
                new THREE.Color(color),
                0.045,
                0.03,
              ]}
            />
          </group>
        )
      })}
    </group>
  )
}

export default function ElectricField({
  visible = false,
  stageCount = 3,
  gap = 0.35,
  intensity = 1,
  color = "#fbbf24",
}: ElectricFieldProps) {
  if (!visible) return null

  return (
    <group>
      {STAGE_POSITIONS.slice(0, stageCount).map(
        (x, index) => (
          <FieldStage
            key={index}
            positionX={x}
            gap={gap}
            intensity={intensity}
            color={color}
          />
        )
      )}
    </group>
  )
}
