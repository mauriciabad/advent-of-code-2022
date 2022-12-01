const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const result = Math.max(...input.split('\n\n').map((a)=> a.split('\n').map((calory)=>Number(calory)).reduce((a, b) => a + b, 0)))

console.log(result)