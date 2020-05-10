let createError = require('http-errors')
let mongoose = require('mongoose')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let mockStockMovement = require('./mockstockmovement')
let indexRouter = require('./routes/index')
let config = require('./bin/config')

mongoose.connect(config.connectionString, { useNewUrlParser: true })
let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'vash')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

/*
start mock movements in stock values
*/
let timer = mockStockMovement()
module.exports = app
