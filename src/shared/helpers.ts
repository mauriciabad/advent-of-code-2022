export function sum(array: Iterable<number>): number {
  return [...array].reduce((a, b) => a + b, 0)
}
