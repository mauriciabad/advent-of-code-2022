type Instruction = NOOPInstruction | AddInstruction

type NOOPInstruction = { type: 'noop' }
type AddInstruction = { type: 'addx', value: number }

export function answer(input: string): string {
  const instructions: Instruction[] = input.split('\n').filter(Boolean).map((line) => {
    const args = line.split(' ')
    if (args[0] === 'noop') {
      return {
        type: 'noop',
      }
    } else if (args[0] === 'addx') {

      return {
        type: 'addx',
        value: Number(args[1]),
      }
    } else {
      throw new Error(`Wrong instruction: "${args[0]}" in "${line}"`,)
    }
  })

  const regValues: number[] = [1]
  instructions.forEach((instruction) => {
    const lastRegValue = regValues[regValues.length - 1]

    switch (instruction.type) {
      case 'noop': regValues.push(lastRegValue); break;
      case 'addx': regValues.push(lastRegValue, lastRegValue + instruction.value); break;
    }
  })

  const result = sum([
    signalStrength(regValues[20 - 1], 20),
    signalStrength(regValues[60 - 1], 60),
    signalStrength(regValues[100 - 1], 100),
    signalStrength(regValues[140 - 1], 140),
    signalStrength(regValues[180 - 1], 180),
    signalStrength(regValues[220 - 1], 220)
  ])
  return String(result)
}

// ------------------- helper functions -----------------

function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}

function signalStrength(regValue: number, cycle: number): number {
  return regValue * cycle
}