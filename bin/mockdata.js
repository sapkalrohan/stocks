/*
 mock data to create database from scratch 
 run ~/bin/initDb.js to create database
*/
let users = [
  { username: 'rohan', password: 'pass123' },
  { username: 'smriti', password: 'pass321' },
  { username: 'yash', password: 'pass12345' }
]

let stockmaster = [
  { symbol: 'AAPL', value: 310.13 },
  { symbol: 'AMZN', value: 2379.61 },
  { symbol: 'MSFT', value: 184.68 },
  { symbol: 'GOOGL', value: 1384.34 },
  { symbol: 'INTC', value: 59.67 },
  { symbol: 'NFLX', value: 435.55 }
]
let assets = [
  { symbol: 'AAPL', quantity: 50, owner: 'rohan' },
  { symbol: 'AMZN', quantity: 75, owner: 'rohan' },
  { symbol: 'INTC', quantity: 68, owner: 'rohan' },
  { symbol: 'AAPL', quantity: 100, owner: 'smriti' },
  { symbol: 'AMZN', quantity: 150, owner: 'smriti' },
  { symbol: 'MSFT', quantity: 175, owner: 'smriti' },
  { symbol: 'GOOGL', quantity: 125, owner: 'smriti' },
  { symbol: 'AAPL', quantity: 100, owner: 'yash' },
  { symbol: 'AMZN', quantity: 150, owner: 'yash' },
  { symbol: 'INTC', quantity: 150, owner: 'yash' },
  { symbol: 'GOOGL', quantity: 150, owner: 'yash' },
  { symbol: 'MSFT', quantity: 175, owner: 'yash' },
  { symbol: 'NFLX', quantity: 200, owner: 'yash' }
]
module.exports = { assets, users, stockmaster }
