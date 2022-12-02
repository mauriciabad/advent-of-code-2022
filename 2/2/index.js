const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const rounds = input.split('\n').filter(Boolean)

// Rock: A X
// Paper: B Y
// Scissors: C Z

const scores = {
  'B X': 1 + 0,
  'C X': 2 + 0,
  'A X': 3 + 0,
  
  'A Y': 1 + 3,
  'B Y': 2 + 3,
  'C Y': 3 + 3,

  'A Z': 2 + 6,
  'C Z': 1 + 6,
  'B Z': 3 + 6,
}

rounds.forEach(round => {
  if(!Object.keys(scores).includes(round)) console.log(`unknonw round "${round}"`)
})

const result = rounds.map(round=> scores[round]).reduce((a, b) => a + b, 0)

console.log(result)