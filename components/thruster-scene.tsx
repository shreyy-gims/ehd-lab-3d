
"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import ThrusterModel from "./thruster/thruster-model"
import IonParticles from "./thruster/ion-particles"
import Airflow from "./thruster/airflow"
import ElectricField from "./thruster/electric-field"

interface ThrusterSceneProps {
  showIons?: boolean
  showAirflow?: boolean
  showElectricField?: boolean
  exploded?: boolean
  transparent?: boolean
  active?: boolean
  speed?: number
  stageCount?: 1 | 2 | 3
  gapMillimeters?: number
}

export default function ThrusterScene({
  showIons = true,
  showAirflow = true,
  showElectricField = false,
  exploded = false,
  transparent = true,
  active = true,
  speed = 1,
  stageCount = 3,
  gapMillimeters = 20,
}: ThrusterSceneProps) {
  /*
   * Convert the electrode gap in millimeters
   * to illustrative 3D scene units.
   *
   * 5 mm  -> 0.20 scene units
   * 50 mm -> 0.50 scene units
   *
   * This is visual scaling, not a CAD scale.
   */
  const clampedGap = Math.min(
    50,
    Math.max(5, gapMillimeters)
  )

  const visualGap =
    0.2 + ((clampedGap - 5) / 45) * 0.3

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [5, 3, 5],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        {/* BACKGROUND */}
        <color
          attach="background"
          args={["#08111f"]}
        />

        {/* LIGHTING */}
        <ambientLight intensity={0.8} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <pointLight
          position={[-2, 2, 2]}
          color="#38bdf8"
          intensity={15}
          distance={8}
        />

        {/* MAIN THRUSTER MODEL */}
        <ThrusterModel
          exploded={exploded}
          transparent={transparent}
          showMesh={true}
          active={active}
          stageCount={stageCount}
          gap={visualGap}
        />

        {/* ION PARTICLES */}
        <IonParticles
          count={120}
          speed={speed}
          active={active}
          visible={showIons && !exploded}
          stageCount={stageCount}
          gap={visualGap}
        />

        {/* AIRFLOW */}
        <Airflow
          visible={showAirflow && !exploded}
          active={active}
          speed={speed}
          particleCount={90}
          showStreamlines={true}
        />

        {/* ELECTRIC FIELD */}
        <ElectricField
          visible={
            showElectricField && !exploded
          }
          stageCount={stageCount}
          gap={visualGap}
          intensity={1}
        />

        {/* CAMERA CONTROLS */}
        <OrbitControls
          enablePan
          enableZoom
          minDistance={3}
          maxDistance={12}
          enableDamping
          dampingFactor={0.08}
        />

        {/* REFERENCE GRID */}
        <gridHelper
          args={[
            12,
            12,
            "#334155",
            "#1e293b",
          ]}
          position={[0, -1.5, 0]}
        />
      </Canvas>
    </div>
  )
}
