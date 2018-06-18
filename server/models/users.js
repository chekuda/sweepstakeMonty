const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newSchema = new Schema({
  user: String,
  points: Number,
  bets: Array,
  updated: Date
})

const User = mongoose.model('users', newSchema)

module.exports = User
