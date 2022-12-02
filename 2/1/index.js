const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const rounds = input.split('\n').filter(Boolean)

// Rock: A X
// Paper: B Y
// Scissors: C Z

const scores = {
  'A X': 1 + 3,
  'B X': 1 + 0,
  'C X': 1 + 6,

  'A Y': 2 + 6,
  'B Y': 2 + 3,
  'C Y': 2 + 0,

  'A Z': 3 + 0,
  'B Z': 3 + 6,
  'C Z': 3 + 3,
}

rounds.forEach(round => {
  if(!Object.keys(scores).includes(round)) console.log(`unknonw round "${round}"`)
})

const result = rounds.map(round=> scores[round]).reduce((a, b) => a + b, 0)

console.log(result)