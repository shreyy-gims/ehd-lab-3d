
"use client"

import {
  Download,
  History,
  Trash2,
} from "lucide-react"

import type {
  ExperimentParameters,
  ExperimentResult,
} from "@/lib/physics"

export interface ExperimentRecord {
  id: string
  timestamp: string
  parameters: ExperimentParameters
  result: ExperimentResult
}

interface ExperimentHistoryProps {
  records: ExperimentRecord[]
  onDelete: (id: string) => void
  onClear: () => void
}

function downloadCSV(records: ExperimentRecord[]) {
  const headers = [
    "Trial",
    "Timestamp",
    "Current (uA)",
    "Gap (mm)",
    "Mobility (m2/Vs)",
    "Stages",
    "Single Stage Thrust (mN)",
    "Total Ideal Thrust (mN)",
  ]

  const rows = records.map((record, index) => [
    index + 1,
    record.timestamp,
    record.parameters.currentMicroamps,
    record.parameters.gapMillimeters,
    record.parameters.mobility,
    record.parameters.stageCount,
    record.result.singleStageThrustMilliN,
    record.result.totalIdealThrustMilliN,
  ])

  const escapeCSV = (value: string | number) =>
    `"${String(value).replace(/"/g, '""')}"`

  const csv = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\r\n")

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = "ehd-lab-experiment-history.csv"
  document.body.appendChild(link)
  link.click()
  link.remove()

  URL.revokeObjectURL(url)
}

export default function ExperimentHistory({
  records,
  onDelete,
  onClear,
}: ExperimentHistoryProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-cyan-400" />

          <div>
            <h2 className="font-semibold">
              Experiment History
            </h2>

            <p className="text-xs text-slate-400">
              {records.length} recorded trials
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={records.length === 0}
            onClick={() => downloadCSV(records)}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>

          <button
            type="button"
            disabled={records.length === 0}
            onClick={onClear}
            className="flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
          <History className="mx-auto mb-3 h-8 w-8 text-slate-500" />

          <p className="text-sm font-medium">
            No experiments recorded
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Adjust the parameters and select
            Record Experiment to save a trial.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-slate-700 text-slate-400">
              <tr>
                <th className="px-3 py-3">Trial</th>
                <th className="px-3 py-3">Current</th>
                <th className="px-3 py-3">Gap</th>
                <th className="px-3 py-3">Mobility</th>
                <th className="px-3 py-3">Stages</th>
                <th className="px-3 py-3">Ideal Thrust</th>
                <th className="px-3 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record, index) => (
                <tr
                  key={record.id}
                  className="border-b border-slate-800"
                >
                  <td className="px-3 py-4">
                    #{index + 1}
                  </td>

                  <td className="px-3 py-4">
                    {record.parameters.currentMicroamps} µA
                  </td>

                  <td className="px-3 py-4">
                    {record.parameters.gapMillimeters} mm
                  </td>

                  <td className="px-3 py-4">
                    {record.parameters.mobility.toExponential(2)}
                  </td>

                  <td className="px-3 py-4">
                    {record.parameters.stageCount}
                  </td>

                  <td className="px-3 py-4 font-semibold text-cyan-400">
                    {record.result.totalIdealThrustMilliN.toFixed(3)} mN
                  </td>

                  <td className="px-3 py-4">
                    <button
                      type="button"
                      onClick={() => onDelete(record.id)}
                      aria-label={`Delete trial ${index + 1}`}
                      className="rounded-md p-2 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
