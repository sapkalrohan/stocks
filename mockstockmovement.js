/*
these function mock market movement/change in stock value with 
upto 1% delta change upwards/downwards
every random 3-10 secs per stock 

called in ./app.js
*/

let SocketsSendMessage = require('./socket').sendMessage
let StockMaster = require('./models/Stockmaster')
let Asset = require('./models/Asset')
const random = require('random')

/*
called in ./app.js
*/
function startMovementForAllStocks() {
  StockMaster.find({}, function(err, stocks) {
    stocks.forEach(s => {
      mockMovement(s)
    })
  })
}

function mockMovement(stock) {
  let value = stock.value
  let delta = value * random.float(0, 0.01).toPrecision(2)
  value = random.int(0, 1) == 1 ? value + delta : value - delta
  stock.value = value.toFixed(2)
  stock.save(function() {
    notifyUsers(stock)
    setTimeout(() => {
      mockMovement(stock)
    }, random.int(3, 10) * 1000)
  })
}

/*
emit msg to assetholders(users) for specific stock
*/
function notifyUsers(stock) {
  Asset.find({ stock: stock._id }, (err, assets) => {
    if (err) return err
    assets.forEach(a => {
      SocketsSendMessage(stock, a)
    })
  })
}

module.exports = startMovementForAllStocks
