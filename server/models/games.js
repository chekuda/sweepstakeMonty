const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newSchema = new Schema({
  teams: Array,
  result: Array,
  total: Array,
  date: Date
})

const Games = mongoose.model('games', newSchema)

module.exports = Games
