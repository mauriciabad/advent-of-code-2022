import { readFileSync } from 'fs'

const input = readFileSync('./1/1/input.txt', 'utf8')

const result = Math.max(...input.split('\n\n').map((a)=> a.split('\n').map((calory)=>Number(calory)).reduce((a, b) => a + b, 0)))

console.log(result)