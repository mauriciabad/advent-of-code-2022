export function run(answer:(input: string)=> string, input:string, testData: {input:string,output:string}[]):void {
  console.log('\nTests:')
  for (const i in testData) {
    const {input, output} = testData[i];
    const passes = answer(input) === output;
    console.log(`${passes ? '✅️ Pass' : '❌️ Fail'} - Test #${i}`)
  }

  console.log('\nResult:')
  console.log(answer(input))
}