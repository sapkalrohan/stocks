let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
//authenticate input against database
UserSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({ username: username }).exec(function(err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      let err = new Error('User not found.')
      err.status = 401
      return callback(err)
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        return callback(null, user)
      } else {
        return callback()
      }
    })
  })
}
UserSchema.statics.findByUsername = function(username, callback) {
  User.findOne({ username: username }).exec(function(err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      let err = new Error('User not found.')
      err.status = 401
      return callback(err)
    } else {
      return callback(null, user)
    }
  })
}

UserSchema.pre('save', function(next) {
  let user = this
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})
let User = mongoose.model('User', UserSchema)
module.exports = User
