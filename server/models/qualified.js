const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newSchema = new Schema({
  wc: Number,
  allTeams: Array,
  gSixteen: Array,
  qFinal: Array,
  semifinals: Array,
  final: Array,
  winner: String,
  bestPlayer: String,
  goldenBoot: String
})

const Qualified = mongoose.model('qualified', newSchema)

module.exports = Qualified
