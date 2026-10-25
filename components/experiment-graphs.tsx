
"use client"

import { useMemo } from "react"

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartNoAxesCombined } from "lucide-react"

import {
  calculateExperiment,
  PHYSICS_LIMITS,
  type ExperimentParameters,
} from "@/lib/physics"

interface ExperimentGraphsProps {
  parameters: ExperimentParameters
}

interface GraphPoint {
  x: number
  thrust: number
}

function makeSeries(
  parameters: ExperimentParameters,
  key: "currentMicroamps" | "gapMillimeters" | "mobility",
  min: number,
  max: number,
  steps = 30
): GraphPoint[] {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const x = min + (index / steps) * (max - min)

    const result = calculateExperiment({
      ...parameters,
      [key]: x,
    })

    return {
      x,
      thrust: result.totalIdealThrustMilliN,
    }
  })
}

function GraphCard({
  title,
  xLabel,
  data,
  selectedX,
  selectedY,
  formatter,
}: {
  title: string
  xLabel: string
  data: GraphPoint[]
  selectedX: number
  selectedY: number
  formatter?: (value: number) => string
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <h3 className="mb-1 text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mb-4 text-xs text-slate-500">
        {xLabel}
      </p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 12,
              right: 12,
              left: 0,
              bottom: 12,
            }}
          >
            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={formatter}
              tick={{
                fill: "#94a3b8",
                fontSize: 10,
              }}
            />

            <YAxis
              tick={{
                fill: "#94a3b8",
                fontSize: 10,
              }}
              width={42}
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(3)} mN`,
                "Ideal Thrust",
              ]}
              labelFormatter={(label) =>
                `Input: ${
                  formatter
                    ? formatter(Number(label))
                    : Number(label).toFixed(2)
                }`
              }
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="thrust"
              stroke="#22d3ee"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />

            <ReferenceDot
              x={selectedX}
              y={selectedY}
              r={5}
              fill="#fbbf24"
              stroke="#fff"
              strokeWidth={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function ExperimentGraphs({
  parameters,
}: ExperimentGraphsProps) {
  const currentResult = calculateExperiment(parameters)

  const currentData = useMemo(
    () =>
      makeSeries(
        parameters,
        "currentMicroamps",
        PHYSICS_LIMITS.currentMicroamps.min,
        PHYSICS_LIMITS.currentMicroamps.max
      ),
    [parameters]
  )

  const gapData = useMemo(
    () =>
      makeSeries(
        parameters,
        "gapMillimeters",
        PHYSICS_LIMITS.gapMillimeters.min,
        PHYSICS_LIMITS.gapMillimeters.max
      ),
    [parameters]
  )

  const mobilityData = useMemo(
    () =>
      makeSeries(
        parameters,
        "mobility",
        PHYSICS_LIMITS.mobility.min,
        PHYSICS_LIMITS.mobility.max
      ),
    [parameters]
  )

  const selectedY = currentResult.totalIdealThrustMilliN

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-2">
        <ChartNoAxesCombined className="h-5 w-5 text-cyan-400" />

        <div>
          <h2 className="font-semibold text-white">
            Performance Graphs
          </h2>

          <p className="text-xs text-slate-400">
            Idealized model predictions
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <GraphCard
          title="Thrust vs Corona Current"
          xLabel="Corona current (µA)"
          data={currentData}
          selectedX={parameters.currentMicroamps}
          selectedY={selectedY}
          formatter={(value) => value.toFixed(0)}
        />

        <GraphCard
          title="Thrust vs Electrode Gap"
          xLabel="Electrode gap (mm)"
          data={gapData}
          selectedX={parameters.gapMillimeters}
          selectedY={selectedY}
          formatter={(value) => value.toFixed(0)}
        />

        <GraphCard
          title="Thrust vs Ion Mobility"
          xLabel="Ion mobility (m²/(V·s))"
          data={mobilityData}
          selectedX={parameters.mobility}
          selectedY={selectedY}
          formatter={(value) => value.toExponential(1)}
        />
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        The yellow marker represents the selected experiment.
        These curves use the ideal model with other parameters
        held constant; they are not measured performance data.
      </p>
    </section>
  )
}
