
"use client"

import { useState } from "react"

import {
  Activity,
  Atom,
  Info,
  RotateCcw,
  Zap,
} from "lucide-react"

import {
  calculateExperiment,
  DEFAULT_EXPERIMENT,
  PHYSICS_LIMITS,
  type ExperimentParameters,
} from "@/lib/physics"

export default function PhysicsControls() {
  const [parameters, setParameters] =
    useState<ExperimentParameters>({
      ...DEFAULT_EXPERIMENT,
    })

  const result = calculateExperiment(parameters)

  function update<K extends keyof ExperimentParameters>(
    key: K,
    value: ExperimentParameters[K]
  ) {
    setParameters((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function reset() {
    setParameters({ ...DEFAULT_EXPERIMENT })
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white sm:p-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />

            <h2 className="text-lg font-semibold">
              Experiment Controls
            </h2>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Adjust theoretical EHD parameters.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          title="Reset experiment parameters"
          aria-label="Reset experiment parameters"
          className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* CURRENT */}
      <div>
        <div className="mb-3 flex justify-between gap-2 text-sm">
          <label htmlFor="corona-current">
            Corona Current
          </label>

          <span className="font-semibold text-cyan-400">
            {parameters.currentMicroamps} µA
          </span>
        </div>

        <input
          id="corona-current"
          type="range"
          min={PHYSICS_LIMITS.currentMicroamps.min}
          max={PHYSICS_LIMITS.currentMicroamps.max}
          step="1"
          value={parameters.currentMicroamps}
          onChange={(event) =>
            update(
              "currentMicroamps",
              Number(event.target.value)
            )
          }
          className="w-full accent-cyan-400"
        />

        <div className="mt-1 flex justify-between text-[10px] text-slate-500">
          <span>0 µA</span>
          <span>100 µA</span>
        </div>
      </div>

      {/* ELECTRODE GAP */}
      <div>
        <div className="mb-3 flex justify-between gap-2 text-sm">
          <label htmlFor="electrode-gap">
            Electrode Gap
          </label>

          <span className="font-semibold text-cyan-400">
            {parameters.gapMillimeters} mm
          </span>
        </div>

        <input
          id="electrode-gap"
          type="range"
          min={PHYSICS_LIMITS.gapMillimeters.min}
          max={PHYSICS_LIMITS.gapMillimeters.max}
          step="1"
          value={parameters.gapMillimeters}
          onChange={(event) =>
            update(
              "gapMillimeters",
              Number(event.target.value)
            )
          }
          className="w-full accent-cyan-400"
        />

        <div className="mt-1 flex justify-between text-[10px] text-slate-500">
          <span>5 mm</span>
          <span>50 mm</span>
        </div>
      </div>

      {/* ION MOBILITY */}
      <div>
        <div className="mb-3 flex justify-between gap-2 text-sm">
          <label htmlFor="ion-mobility">
            Ion Mobility
          </label>

          <span className="font-semibold text-cyan-400">
            {parameters.mobility.toExponential(2)}
          </span>
        </div>

        <input
          id="ion-mobility"
          type="range"
          min={PHYSICS_LIMITS.mobility.min}
          max={PHYSICS_LIMITS.mobility.max}
          step="0.00001"
          value={parameters.mobility}
          onChange={(event) =>
            update(
              "mobility",
              Number(event.target.value)
            )
          }
          className="w-full accent-cyan-400"
        />

        <p className="mt-2 text-[10px] text-slate-500">
          Unit: m²/(V·s)
        </p>
      </div>

      {/* STAGE COUNT */}
      <div>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span>Active Stages</span>

          <span className="font-semibold text-cyan-400">
            {parameters.stageCount}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => update("stageCount", stage)}
              aria-pressed={parameters.stageCount === stage}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                parameters.stageCount === stage
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                  : "border-slate-700 bg-slate-950 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS */}
      <div className="space-y-4 rounded-xl border border-cyan-500/15 bg-slate-950 p-5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-cyan-400" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Ideal Theoretical Thrust
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Total Ideal Thrust
          </p>

          <p className="mt-1 text-3xl font-bold tracking-tight text-cyan-400">
            {result.totalIdealThrustMilliN.toFixed(3)}
            <span className="ml-2 text-base font-medium">
              mN
            </span>
          </p>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <div className="flex justify-between gap-3 text-xs">
            <span className="text-slate-400">
              Per-stage contribution
            </span>

            <span className="font-semibold text-white">
              {result.singleStageThrustMilliN.toFixed(3)} mN
            </span>
          </div>

          <div className="mt-3 flex justify-between gap-3 text-xs">
            <span className="text-slate-400">
              Stage count
            </span>

            <span className="font-semibold text-white">
              {result.stageCount}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 px-3 py-2 text-center text-xs text-slate-400">
          T = I × d / μ
        </div>
      </div>

      {/* MODEL INFORMATION */}
      <div className="rounded-xl border border-slate-800 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Atom className="h-4 w-4 text-cyan-400" />

          <h3 className="text-sm font-semibold">
            Model Assumptions
          </h3>
        </div>

        <p className="text-xs leading-5 text-slate-400">
          The ideal model assumes equal current,
          electrode gap and ion mobility across
          all active stages.
        </p>

        <div className="mt-3 flex items-start gap-2">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />

          <p className="text-[11px] leading-5 text-slate-500">
            This is not a measured thrust value.
            Real performance depends on discharge
            physics, airflow and stage interaction.
          </p>
        </div>
      </div>
    </div>
  )
}
