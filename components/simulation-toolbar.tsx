
"use client"

import {
  Activity,
  Atom,
  Eye,
  Layers3,
  Pause,
  Play,
  RotateCcw,
  Wind,
  Zap,
} from "lucide-react"

export interface SimulationSettings {
  showIons: boolean
  showAirflow: boolean
  showElectricField: boolean
  transparent: boolean
  exploded: boolean
  active: boolean
  speed: number
}

export const DEFAULT_SIMULATION: SimulationSettings = {
  showIons: true,
  showAirflow: true,
  showElectricField: false,
  transparent: true,
  exploded: false,
  active: true,
  speed: 1,
}

interface SimulationToolbarProps {
  settings: SimulationSettings
  onChange: (settings: SimulationSettings) => void
}

export default function SimulationToolbar({
  settings,
  onChange,
}: SimulationToolbarProps) {
  function update<K extends keyof SimulationSettings>(
    key: K,
    value: SimulationSettings[K]
  ) {
    onChange({ ...settings, [key]: value })
  }

  const switches = [
    {
      key: "showIons" as const,
      label: "Ion Particles",
      description: "Charged particle motion",
      icon: Atom,
    },
    {
      key: "showAirflow" as const,
      label: "Airflow",
      description: "Neutral air movement",
      icon: Wind,
    },
    {
      key: "showElectricField" as const,
      label: "Electric Field",
      description: "Illustrative field lines",
      icon: Zap,
    },
    {
      key: "transparent" as const,
      label: "Transparent View",
      description: "Inspect internal geometry",
      icon: Eye,
    },
    {
      key: "exploded" as const,
      label: "Exploded View",
      description: "Separate electrode stages",
      icon: Layers3,
    },
  ]

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white">
      <div className="mb-6 flex items-center gap-3">
        <Activity className="h-5 w-5 text-cyan-400" />

        <div>
          <h2 className="text-lg font-semibold">
            Simulation Controls
          </h2>
          <p className="text-xs text-slate-400">
            Customize the 3D visualization
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {switches.map((item) => {
          const Icon = item.icon
          const checked = settings[item.key]

          return (
            <label
              key={item.key}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-cyan-400" />

                <div>
                  <p className="text-sm font-medium">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={checked}
                onChange={(e) =>
                  update(item.key, e.target.checked)
                }
                className="h-4 w-4 accent-cyan-400"
              />
            </label>
          )
        })}
      </div>

      <div className="mt-6 border-t border-slate-800 pt-5">
        <button
          type="button"
          onClick={() => update("active", !settings.active)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {settings.active ? (
            <>
              <Pause className="h-4 w-4" />
              Pause Simulation
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Resume Simulation
            </>
          )}
        </button>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span>Animation Speed</span>
          <span className="font-semibold text-cyan-400">
            {settings.speed.toFixed(2)}×
          </span>
        </div>

        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={settings.speed}
          onChange={(e) =>
            update("speed", Number(e.target.value))
          }
          className="mt-3 w-full accent-cyan-400"
        />

        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_SIMULATION })}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm transition hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Controls
        </button>
      </div>
    </section>
  )
}
