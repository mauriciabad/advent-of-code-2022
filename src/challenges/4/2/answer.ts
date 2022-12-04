export function answer(input: string): string {
  const areas: Set<number>[][] = input.split('\n').map((line) => 
    line.split(',').map(elfArea => {
      const [, start,end]= elfArea.match(/(\d+)-(\d+)/)?.map(Number) ?? []
      const numbers = range(start,end)
      return new Set(numbers)
    })
  )
  const pairsWithRepeatedAreas: (1|0)[] = areas.map(([elf1Area,elf2Area]) => {
    const intersection = intersect(elf1Area,elf2Area)
    const aaa = intersection.size >= 1
    return aaa ? 1 : 0
})

  const result = sum(pairsWithRepeatedAreas)
  return String(result)
}

// ------------------- helper functions -----------------

const eqSet = <T>(xs:Set<T>, ys:Set<T>):boolean =>
    xs.size === ys.size &&
    [...xs].every((x) => ys.has(x));

function range(start:number, end:number):number[] {
  return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}
function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}
function intersect<T>(a:Set<T>,b: Set<T>): Set<T> {
  return new Set([...a].filter(i => b.has(i)));
}