export type TestData = {
  input: string;
  output: string;
  only?: boolean;
};

export function run(answer: (input: string) => string, input: string, testData: TestData[]): void {
  function test(i: number) {
    const { input, output } = testData[i]
    const result = answer(input)
    const passes = result === output
    console.log(makeLogMessage(passes, result, output, i))
  }

  (() => {
    for (let i = 0; i < testData.length; i++) {
      if (!testData[i].only) continue
      console.log(`\nTests: (Only #${i + 1})`)
      test(i)
      return
    }

    console.log('\nTests:')
    for (let i = 0; i < testData.length; i++) {
      test(i)
    }
  })()

  const hasOnly = testData.some(test => test.only)
  if (!hasOnly) {
    console.log('\nResult:')
    console.log(answer(input))
  }
}

const makeLogMessage = (passes: boolean, result: string, output: string, i: number) => {
  return `${passes ? '✅️ Pass' : '❌️ Fail'} #${i + 1} | ${passes ? `Answer ${cut(result)}` : `Expected ${cut(output)}got ${cut(result)}`}`
}
function cut(result: string) {
  if (result.includes('\n')) {
    return `\n${result}\n\n`
  }

  const MAX_LENGTH = 60
  if (result.length > MAX_LENGTH && !result.includes('.')) {
    return `"${result.substring(0, MAX_LENGTH / 2)}...${result.substring(result.length - MAX_LENGTH / 2, result.length)}" `;
  }

  return `"${result}" `

}

