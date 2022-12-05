import { Stack } from 'stack-typescript';

export function answer(input: string): string {
  const [stakcDiagram, instructionsAsText] = input.split('\n\n')
  const stackLetters: (string | '')[][] = stakcDiagram.split('\n').slice(0, -1).map(line => [...line.match(/ ?[\[ ]([\w ])[\] ]/g) ?? []]).map(matchLine => matchLine.map(match => match.trim().charAt(1) || ''))
  const stacksArray: (string)[][] = transpose(stackLetters).map(stackArray => stackArray.filter(Boolean))
  const stacks: Record<number, Stack<string>> = Object.fromEntries(stacksArray.map((stackArray, i) => [i + 1, new Stack(...stackArray)]))

  instructionsAsText.split('\n').forEach(line => {
    const [, amount, origin, destination] = [...line.match(/move (\d+) from (\d+) to (\d+)/) ?? []].map(Number)
    for (let i = 0; i < amount; i++) {
      const movingElem = stacks[origin].pop()
      stacks[destination].push(movingElem)
    }
  })

  const topElements = Object.values(stacks).map(stack => stack.top)

  const result = topElements.join('')
  return result
}

// ------------------- helper functions -----------------

function transpose<T>(array: T[][]): T[][] {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}
