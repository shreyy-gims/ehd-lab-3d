
"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"

import {
  Activity,
  ArrowLeft,
  Atom,
  FlaskConical,
  Gauge,
  Info,
  Layers3,
  Rotate3D,
  SlidersHorizontal,
  Wind,
  Zap,
} from "lucide-react"

import ProjectIntro from "@/components/project-intro"

import SimulationToolbar, {
  DEFAULT_SIMULATION,
  type SimulationSettings,
} from "@/components/simulation-toolbar"

import {
  calculateExperiment,
  DEFAULT_EXPERIMENT,
  type ExperimentParameters,
} from "@/lib/physics"

import ExperimentDashboard from "@/components/experiment-dashboard"

const ThrusterScene = dynamic(
  () => import("@/components/thruster-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#08111f]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />

          <p className="text-sm text-slate-400">
            Loading 3D Laboratory...
          </p>
        </div>
      </div>
    ),
  }
)

export default function Home() {
  // Opening presentation appears first.
  const [showIntro, setShowIntro] = useState(true)

  // 3D visualization settings.
  const [simulation, setSimulation] =
    useState<SimulationSettings>({
      ...DEFAULT_SIMULATION,
    })

  // Shared experiment parameters.
  const [experimentParameters, setExperimentParameters] =
    useState<ExperimentParameters>({
      ...DEFAULT_EXPERIMENT,
    })

  // Live theoretical calculations.
  const experimentResult = useMemo(
    () => calculateExperiment(experimentParameters),
    [experimentParameters]
  )

  // Show introduction before loading the laboratory.
  if (showIntro) {
    return (
      <ProjectIntro
        onEnter={() => setShowIntro(false)}
      />
    )
  }

  return (
    <main className="min-h-screen bg-[#060d18] text-white">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-[#08111f]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2">
              <Atom className="h-7 w-7 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                EHD-Lab 3D
              </h1>

              <p className="text-xs text-slate-400">
                Ionic Wind Propulsion Virtual Laboratory
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Return to introduction */}
            <button
              type="button"
              onClick={() => setShowIntro(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Presentation
            </button>

            {/* Simulation status */}
            <div className="hidden items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-300 sm:flex">
              <span
                className={`h-2 w-2 rounded-full ${
                  simulation.active
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />

              {simulation.active
                ? "Simulation Running"
                : "Simulation Paused"}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        {/* INTRODUCTION */}
        <div className="mb-9">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-cyan-400">
            <Zap className="h-4 w-4" />
            ELECTROHYDRODYNAMIC PROPULSION
          </div>

          <h2 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Explore Ionic Wind in 3D
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
            Explore a multi-stage ionic wind thruster
            through interactive 3D visualization,
            electrode inspection, animated airflow,
            and theoretical thrust calculations.
          </p>
        </div>

        {/* 3D VIEWER AND LIVE DATA */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
          {/* 3D VIEWER */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            {/* VIEWER HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />

                <span className="text-sm font-semibold">
                  Interactive 3D Visualization
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-md border border-slate-700 px-2 py-1 text-[10px] text-slate-400">
                  {experimentParameters.stageCount}{" "}
                  {experimentParameters.stageCount === 1
                    ? "STAGE"
                    : "STAGES"}
                </span>

                <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[10px] text-cyan-400">
                  LIVE VIEW
                </span>
              </div>
            </div>

            {/* THREE.JS CANVAS */}
            <div className="relative h-105 sm:h-125 lg:h-145">
              <ThrusterScene
                showIons={simulation.showIons}
                showAirflow={simulation.showAirflow}
                showElectricField={
                  simulation.showElectricField
                }
                exploded={simulation.exploded}
                transparent={simulation.transparent}
                active={simulation.active}
                speed={simulation.speed}
                stageCount={experimentParameters.stageCount}
                gapMillimeters={
                  experimentParameters.gapMillimeters
                }
              />

              {/* VIEWER OVERLAY */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">
                  {simulation.exploded
                    ? "Exploded Inspection Mode"
                    : "Assembled Thruster"}
                </span>

                <span className="rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">
                  Speed: {simulation.speed.toFixed(2)}×
                </span>

                <span className="rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">
                  Gap: {experimentParameters.gapMillimeters} mm
                </span>

                {!simulation.active && (
                  <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-300 backdrop-blur">
                    Paused
                  </span>
                )}
              </div>
            </div>

            {/* VIEWER FOOTER */}
            <div className="flex flex-wrap items-center gap-4 border-t border-slate-800 px-5 py-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Rotate3D className="h-4 w-4" />
                Drag to rotate
              </div>

              <div className="flex items-center gap-2">
                <Layers3 className="h-4 w-4" />
                Scroll to zoom
              </div>

              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Conceptual visualization
              </div>
            </div>
          </div>

          {/* LIVE PHYSICS DATA PANEL */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-5 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-cyan-400" />

                <h3 className="font-semibold">
                  Live Physics Data
                </h3>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-slate-950 p-5">
                <p className="text-xs text-slate-400">
                  Total Ideal Thrust
                </p>

                <p className="mt-3 text-3xl font-bold text-cyan-400">
                  {experimentResult.totalIdealThrustMilliN.toFixed(
                    3
                  )}
                  <span className="ml-2 text-base font-medium">
                    mN
                  </span>
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Ideal sum across{" "}
                  {experimentParameters.stageCount} stage(s)
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-3 border-b border-slate-800 pb-3 text-sm">
                  <span className="text-slate-400">
                    Corona Current
                  </span>

                  <span className="font-semibold">
                    {experimentParameters.currentMicroamps} µA
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-b border-slate-800 pb-3 text-sm">
                  <span className="text-slate-400">
                    Electrode Gap
                  </span>

                  <span className="font-semibold">
                    {experimentParameters.gapMillimeters} mm
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-b border-slate-800 pb-3 text-sm">
                  <span className="text-slate-400">
                    Ion Mobility
                  </span>

                  <span className="font-semibold">
                    {experimentParameters.mobility.toExponential(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-400">
                    Active Stages
                  </span>

                  <span className="font-semibold">
                    {experimentParameters.stageCount}
                  </span>
                </div>
              </div>
            </div>

            {/* SIMULATION INFORMATION */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Wind className="h-5 w-5 text-cyan-400" />

                <h3 className="font-semibold">
                  Simulation Status
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">
                    Ion Particles
                  </span>

                  <span
                    className={
                      simulation.showIons
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }
                  >
                    {simulation.showIons ? "Enabled" : "Disabled"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">
                    Airflow
                  </span>

                  <span
                    className={
                      simulation.showAirflow
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }
                  >
                    {simulation.showAirflow
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">
                    Electric Field
                  </span>

                  <span
                    className={
                      simulation.showElectricField
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }
                  >
                    {simulation.showElectricField
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">
                    Animation
                  </span>

                  <span
                    className={
                      simulation.active
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }
                  >
                    {simulation.active
                      ? "Running"
                      : "Paused"}
                  </span>
                </div>
              </div>
            </div>

            {/* NAVIGATION HINT */}
            <a
              href="#experiment-dashboard"
              className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/20"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Adjust Experiment Parameters
            </a>
          </div>
        </div>

        {/* SIMULATION TOOLBAR */}
        <div className="mt-6">
          <SimulationToolbar
            settings={simulation}
            onChange={setSimulation}
          />
        </div>

        {/* EXPERIMENT DASHBOARD */}
        <section
          id="experiment-dashboard"
          className="mt-12 scroll-mt-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/10 p-3">
              <FlaskConical className="h-6 w-6 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Virtual Physics Laboratory
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Configure, calculate, compare and record
                theoretical EHD experiments.
              </p>
            </div>
          </div>

          <ExperimentDashboard
            parameters={experimentParameters}
            onParametersChange={setExperimentParameters}
          />
        </section>

        {/* SCIENTIFIC DISCLAIMER */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-800 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <p className="text-xs leading-6 text-slate-500">
            This laboratory uses simplified theoretical
            calculations and illustrative 3D animations.
            Ion motion, airflow and electric field
            visualizations are educational representations,
            not validated computational fluid dynamics
            or electrostatic simulations. The calculated
            thrust is an idealized estimate rather than
            a measured performance value.
          </p>
        </div>
      </section>
    </main>
  )
}
