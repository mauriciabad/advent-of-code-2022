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
      console.log(`\nTests: (Only #${i})`)
      test(i)
      return
    }

    console.log('\nTests:')
    for (let i = 0; i < testData.length; i++) {
      test(i)
    }
  })()

  console.log('\nResult:')
  console.log(answer(input))
}

const makeLogMessage = (passes: boolean, result: string, output: string, i: number) => {
  return `${passes ? '✅️ Pass' : '❌️ Fail'} #${i} | ${passes ? `Answer "${cut(result)}"` : `Expected "${cut(output)}" got "${cut(result)}"`}`
}
function cut(result: string) {
  const MAX_LENGTH = 30
  if (result.length > MAX_LENGTH)
    result = result.substring(0, MAX_LENGTH / 2) + '...' + result.substring(result.length - MAX_LENGTH / 2, result.length);
  return result;
}

