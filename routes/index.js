let express = require('express')
const jwt = require('jsonwebtoken')
let User = require('../models/User')
let Asset = require('../models/Asset')
let config = require('../bin/config')
let router = express.Router()

/* login page */
router.get('/', function(req, res, next) {
  if (req.cookies['token']) {
    let payload = req.cookies['token']
    try {
      payload = jwt.verify(payload, config.jwtKey)
    } catch (e) {
      res.clearCookie('token')
      return res.redirect('/')
    }
    if (payload) return res.redirect('/portfolio')
  }
  return res.render('login')
})

/* portfolio page */
router.use('/portfolio', function(req, res, next) {
  let payload = req.cookies['token']
  if (payload) {
    try {
      payload = jwt.verify(payload, config.jwtKey)
    } catch (e) {
      res.clearCookie('token')
      return res.redirect('/')
    }
    Asset.find({ owner: payload.user })
      .populate({ path: 'stock', select: 'symbol value' })
      .populate({
        path: 'owner',
        limit: 1,
        select: 'username'
      })
      .exec(function(err, assets) {
        if (err) {
          return res.redirect('/')
        } else if (!assets) {
          return res.redirect('/')
        } else {
          var model = {
            user: assets[0].owner.username,
            userid: assets[0].owner._id,
            assets: assets
          }
          return res.render('portfolio', model)
        }
      })
  } else {
    return res.redirect('/')
  }
})

/* authentication api for getting token */
router.post('/login', function(req, res, next) {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function(
      error,
      user
    ) {
      if (error || !user) {
        return res.status(401).json({ err: 'Wrong username   or password.' })
      } else {
        const token = jwt.sign({ user: user._id }, config.jwtKey, {
          algorithm: 'HS256',
          expiresIn: 86400
        })
        return res.json({ token: token })
      }
    })
  } else {
    return res.status(400).json({ err: 'invalid data', created: false })
  }
})

/* extra endpoint to add new user */
router.post('/reg', function(req, res, next) {
  if (
    req.body.username &&
    req.body.password &&
    req.body.passwordConf &&
    req.body.passwordConf == req.body.password
  ) {
    let userData = {
      username: req.body.username,
      password: req.body.password
    }

    User.create(userData, function(err, user) {
      if (err) {
        return res.json({ err: err, created: false })
      } else {
        return res.json({ created: true })
      }
    })
  } else {
    return res.status(400).json({ err: 'invalid data', created: false })
  }
})
module.exports = router
