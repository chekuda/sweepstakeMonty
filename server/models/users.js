const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newSchema = new Schema({
  user: String,
  points: Number,
  bets: Array,
  gSixteen: Array,
  qFinal: Array,
  semifinals: Array,
  final: Array,
  winner: String,
  bestPlayer: String,
  goldenBoot: String,
  updated: Date
})

const User = mongoose.model('users', newSchema)

module.exports = User
