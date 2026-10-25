
export interface ThrusterParameters {
  currentMicroamps: number
  gapMillimeters: number
  mobility: number // m²/(V·s)
}

export interface ExperimentParameters extends ThrusterParameters {
  stageCount: 1 | 2 | 3
}

export interface ExperimentResult {
  currentAmps: number
  gapMeters: number
  mobility: number
  stageCount: number

  singleStageThrustN: number
  totalIdealThrustN: number

  singleStageThrustMilliN: number
  totalIdealThrustMilliN: number

  assumptions: string[]
}

export const DEFAULT_EXPERIMENT: ExperimentParameters = {
  currentMicroamps: 20,
  gapMillimeters: 20,
  mobility: 2e-4,
  stageCount: 3,
}

export const PHYSICS_LIMITS = {
  currentMicroamps: {
    min: 0,
    max: 100,
  },
  gapMillimeters: {
    min: 5,
    max: 50,
  },
  mobility: {
    min: 1e-4,
    max: 3e-4,
  },
} as const

function validateParameters({
  currentMicroamps,
  gapMillimeters,
  mobility,
}: ThrusterParameters): void {
  if (
    !Number.isFinite(currentMicroamps) ||
    !Number.isFinite(gapMillimeters) ||
    !Number.isFinite(mobility) ||
    currentMicroamps < 0 ||
    gapMillimeters <= 0 ||
    mobility <= 0
  ) {
    throw new Error("Invalid thruster parameters")
  }
}

/**
 * Idealized thrust relationship:
 *
 * T = I * d / μ
 *
 * I = corona current (A)
 * d = electrode gap (m)
 * μ = ion mobility (m²/(V·s))
 *
 * Returns thrust in newtons.
 *
 * This is an educational approximation, not a
 * validated EHD thruster performance prediction.
 */
export function calculateIdealThrust(
  parameters: ThrusterParameters
): number {
  validateParameters(parameters)

  const currentAmps =
    parameters.currentMicroamps * 1e-6

  const gapMeters =
    parameters.gapMillimeters * 1e-3

  return (
    (currentAmps * gapMeters) /
    parameters.mobility
  )
}

/**
 * Calculates a theoretical experiment result.
 *
 * Assumption: Each stage has the same specified
 * current, gap and mobility.
 *
 * The total is an ideal sum of stage contributions.
 * It does not account for stage interaction,
 * electrical losses or flow coupling.
 */
export function calculateExperiment(
  parameters: ExperimentParameters
): ExperimentResult {
  const {
    currentMicroamps,
    gapMillimeters,
    mobility,
    stageCount,
  } = parameters

  if (![1, 2, 3].includes(stageCount)) {
    throw new Error("Stage count must be 1, 2 or 3")
  }

  const singleStageThrustN =
    calculateIdealThrust({
      currentMicroamps,
      gapMillimeters,
      mobility,
    })

  const totalIdealThrustN =
    singleStageThrustN * stageCount

  return {
    currentAmps: currentMicroamps * 1e-6,
    gapMeters: gapMillimeters * 1e-3,
    mobility,
    stageCount,

    singleStageThrustN,
    totalIdealThrustN,

    singleStageThrustMilliN:
      singleStageThrustN * 1000,

    totalIdealThrustMilliN:
      totalIdealThrustN * 1000,

    assumptions: [
      "Each stage is assigned identical operating parameters.",
      "Corona current is an independent input, not calculated from voltage.",
      "Ion mobility is assumed constant.",
      "The model uses the ideal relationship T = I × d / μ.",
      "The total is the arithmetic sum of ideal stage contributions.",
      "Stage interaction, airflow losses and electrical efficiency are not modeled.",
    ],
  }
}

export function formatThrust(
  thrustNewtons: number,
  digits = 3
): string {
  if (!Number.isFinite(thrustNewtons)) {
    return "Invalid"
  }

  return `${(thrustNewtons * 1000).toFixed(digits)} mN`
}
