export function answer(input: string): string {
  const priorities = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26, A: 27, B: 28, C: 29, D: 30, E: 31, F: 32, G: 33, H: 34, I: 35, J: 36, K: 37, L: 38, M: 39, N: 40, O: 41, P: 42, Q: 43, R: 44, S: 45, T: 46, U: 47, V: 48, W: 49, X: 50, Y: 51, Z: 52 } as const
  
  const rucksackAsSets = input.split('\n').map<[Set<string>,Set<string>]>((line) => {
    const left = line.slice(0,line.length/2)
    const right = line.slice(line.length/2)

    return [new Set(left), new Set(right)]
  })

  const sharedItems = rucksackAsSets.map(([left, right]) => intersect(left,right))

  const score = sum(sharedItems.map((repeatedValues) => sum([...repeatedValues].map(value => priorities[value as keyof typeof priorities]))))
  
  return String(score)
}

function intersect<T>(a:Set<T>,b: Set<T>): Set<T> {
  return new Set([...a].filter(i => b.has(i)));
}
function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}

