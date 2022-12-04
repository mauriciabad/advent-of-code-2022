export function answer(input: string): string {
  const linesAsNumbers = input.split('\n').map(Number)

  const result = sum(linesAsNumbers)
  return String(result)
}

// ------------------- helper functions -----------------

function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}
