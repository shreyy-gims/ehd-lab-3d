
"use client"

import { useMemo, useState } from "react"

import {
  Activity,
  FlaskConical,
  Save,
  Zap,
} from "lucide-react"

import {
  calculateExperiment,
  DEFAULT_EXPERIMENT,
  type ExperimentParameters,
} from "@/lib/physics"

import ExperimentControls from "./experiment-controls"
import ExperimentGraphs from "./experiment-graphs"

import ExperimentHistory, {
  type ExperimentRecord,
} from "./experiment-history"

interface ExperimentDashboardProps {
  parameters: ExperimentParameters
  onParametersChange: (value: ExperimentParameters) => void
}

export default function ExperimentDashboard({
  parameters,
  onParametersChange,
}: ExperimentDashboardProps) {

  const [records, setRecords] =
    useState<ExperimentRecord[]>([])

  const result = useMemo(
    () => calculateExperiment(parameters),
    [parameters]
  )

  function recordExperiment() {
    const record: ExperimentRecord = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      parameters: { ...parameters },
      result: calculateExperiment(parameters),
    }

    setRecords((previous) => [...previous, record])
  }

  function deleteExperiment(id: string) {
    setRecords((previous) =>
      previous.filter((record) => record.id !== id)
    )
  }

  function clearExperiments() {
    setRecords([])
  }

  return (
    <div className="space-y-6">
      {/* DASHBOARD HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-cyan-400">
            <FlaskConical className="h-5 w-5" />

            <span className="text-xs font-semibold uppercase tracking-wider">
              Virtual Laboratory
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Physics Experiment Dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Run theoretical experiments and analyze
            idealized EHD thrust relationships.
          </p>
        </div>

        <button
          type="button"
          onClick={recordExperiment}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          <Save className="h-4 w-4" />
          Record Experiment
        </button>
      </div>

      {/* CONTROLS AND LIVE RESULT */}
      <div className="grid gap-6 lg:grid-cols-[350px_minmax(0,1fr)]">
        <ExperimentControls
  parameters={parameters}
  onChange={onParametersChange}
/>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Zap className="h-4 w-4" />
                <p className="text-xs">
                  Total Ideal Thrust
                </p>
              </div>

              <p className="mt-4 text-3xl font-bold text-cyan-400">
                {result.totalIdealThrustMilliN.toFixed(3)}
                <span className="ml-2 text-base">
                  mN
                </span>
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Ideal sum of {parameters.stageCount} stage(s)
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity className="h-4 w-4" />
                <p className="text-xs">
                  Single-Stage Thrust
                </p>
              </div>

              <p className="mt-4 text-3xl font-bold text-white">
                {result.singleStageThrustMilliN.toFixed(3)}
                <span className="ml-2 text-base">
                  mN
                </span>
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Ideal theoretical contribution
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-sm font-semibold text-white">
              Calculation Model
            </h3>

            <p className="mt-3 font-mono text-lg text-cyan-400">
              T = I × d / μ
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-400">
              Each stage is assumed to have identical
              current, electrode gap and ion mobility.
              Total ideal thrust is calculated as the sum
              of the stage contributions.
            </p>

            <p className="mt-3 text-xs leading-6 text-amber-300/80">
              These values are not experimental
              measurements or validated performance
              predictions.
            </p>
          </div>
        </div>
      </div>

      {/* PERFORMANCE GRAPHS */}
      <ExperimentGraphs parameters={parameters} />

      {/* EXPERIMENT HISTORY */}
      <ExperimentHistory
        records={records}
        onDelete={deleteExperiment}
        onClear={clearExperiments}
      />
    </div>
  )
}
