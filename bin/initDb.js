let mongoose = require('mongoose')
let StockMaster = require('../models/Stockmaster')
let Asset = require('../models/Asset')
let User = require('../models/User')
let mockdata = require('./mockdata')
let config = require('./config')

mongoose.connect(config.connectionString, { useNewUrlParser: true })
var promises = []
mockdata.users.forEach(async u => {
  promises.push(User.create(u))
})

mockdata.stockmaster.forEach(async s => {
  promises.push(StockMaster.create(s))
})

Promise.all(promises).then((res, rej) => {
  mockdata.assets.forEach(a => {
    let asset = { quantity: a.quantity }
    User.findOne({ username: a.owner }).exec(function(err, user) {
      if (err || !user) {
        console.error('usererr', err)
        return
      }
      asset.owner = user.id
      StockMaster.findOne({ symbol: a.symbol }).exec(function(err, stock) {
        if (err || !stock) {
          console.error('stockerr', err)
          return
        }
        asset.stock = stock.id
        Asset.create(asset, function(err, asset) {
          if (err) {
            console.error(err)
          } else {
            console.log(asset)
          }
        })
      })
    })
  })
})
