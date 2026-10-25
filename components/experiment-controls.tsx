
"use client"

import {
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react"

import {
  DEFAULT_EXPERIMENT,
  PHYSICS_LIMITS,
  type ExperimentParameters,
} from "@/lib/physics"

interface ExperimentControlsProps {
  parameters: ExperimentParameters
  onChange: (value: ExperimentParameters) => void
}

export default function ExperimentControls({
  parameters,
  onChange,
}: ExperimentControlsProps) {
  function update<K extends keyof ExperimentParameters>(
    key: K,
    value: ExperimentParameters[K]
  ) {
    onChange({
      ...parameters,
      [key]: value,
    })
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-cyan-400" />
          <h2 className="font-semibold">
            Experiment Parameters
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({ ...DEFAULT_EXPERIMENT })
          }
          aria-label="Reset experiment parameters"
          className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="experiment-current"
            className="mb-3 flex justify-between text-sm"
          >
            <span>Corona Current</span>
            <span className="text-cyan-400">
              {parameters.currentMicroamps} µA
            </span>
          </label>

          <input
            id="experiment-current"
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
        </div>

        <div>
          <label
            htmlFor="experiment-gap"
            className="mb-3 flex justify-between text-sm"
          >
            <span>Electrode Gap</span>
            <span className="text-cyan-400">
              {parameters.gapMillimeters} mm
            </span>
          </label>

          <input
            id="experiment-gap"
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
        </div>

        <div>
          <label
            htmlFor="experiment-mobility"
            className="mb-3 flex justify-between text-sm"
          >
            <span>Ion Mobility</span>
            <span className="text-cyan-400">
              {parameters.mobility.toExponential(2)}
            </span>
          </label>

          <input
            id="experiment-mobility"
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

          <p className="mt-1 text-xs text-slate-500">
            m²/(V·s)
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm">
            Active Stages
          </p>

          <div className="grid grid-cols-3 gap-2">
            {([1, 2, 3] as const).map((stage) => (
              <button
                key={stage}
                type="button"
                aria-pressed={parameters.stageCount === stage}
                onClick={() =>
                  update("stageCount", stage)
                }
                className={`rounded-lg border p-3 text-sm font-semibold ${
                  parameters.stageCount === stage
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                    : "border-slate-700 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
