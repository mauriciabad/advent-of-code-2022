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

  const regValues: number[] = []
  instructions.forEach((instruction) => {
    const lastRegValue = regValues[regValues.length - 1] ?? 1

    switch (instruction.type) {
      case 'noop': regValues.push(lastRegValue); break;
      case 'addx': regValues.push(lastRegValue, lastRegValue + instruction.value); break;
    }
  })

  const litPixels: boolean[] = regValues.map((regValue, i) => {
    const cycle = i + 1
    const wtf: number = regValues[i - 1] ?? 1
    const spritePos: [number, number, number] = [wtf - 1, wtf, wtf + 1]
    const isLit = spritePos.includes((cycle - 1) % 40)
    return isLit
  })

  const screen = [
    litPixels.slice(0, 39),
    litPixels.slice(40, 79),
    litPixels.slice(80, 119),
    litPixels.slice(120, 159),
    litPixels.slice(160, 199),
    litPixels.slice(200, 239),
  ]
  const printedScreen: string = screen.map(l => l.map(lit => lit ? '#' : '.').join('')).join('\n');

  return printedScreen
}

// ------------------- helper functions -----------------

function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}

function signalStrength(regValue: number, cycle: number): number {
  return regValue * cycle
}