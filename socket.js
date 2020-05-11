/*
maintain pool of connected sockets in connectedUsers
   {
    userid1:{sockets1,socket2,....},
    userid2:{sockets1,socket2,....}
     ...
    }
*/
const jwt = require('jsonwebtoken')
let config = require('./bin/config')

var connectedUsers = {}

function configureSockets(io) {
  io.on('connection', socket => {
    //add to socket pool
    socket.on('register', function(token) {
      let userid
      try {
        let payload = jwt.verify(token, config.jwtKey)
        userid = payload.user
      } catch (e) {
        return socket.disconnect(true)
      }
      socket.userid = userid
      let establishedSockets = connectedUsers[userid]
      if (establishedSockets) {
        establishedSockets[socket.id] = socket
      } else {
        var socketpool = {}
        socketpool[socket.id] = socket
        connectedUsers[userid] = socketpool
      }
      console.log('registered ', connectedUsers)
    })

    //remove from socket pool
    socket.on('disconnect', () => {
      let establishedSockets = connectedUsers[socket.userid]
      if (establishedSockets && establishedSockets[socket.id]) {
        delete establishedSockets[socket.id]
        if (Object.keys(establishedSockets).length === 0)
          delete connectedUsers[socket.userid]
      }
      console.log('user disconnected', connectedUsers)
    })
  })
}

/*
function to emit updated stock value to each connected user/socket
this is called from ./mockstockmovement.js
*/
function sendMessage(stock, asset) {
  let socketpool = connectedUsers[asset.owner._id]
  if (socketpool) {
    Object.keys(socketpool).forEach(socketid => {
      var msg = {
        symbol: stock.symbol,
        newvalue: stock.value,
        totalvalue: (stock.value * asset.quantity).toFixed(2)
      }
      socketpool[socketid].emit('asset', msg)
    })
  }
}

module.exports = { configureSockets, sendMessage }
