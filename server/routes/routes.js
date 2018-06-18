const express = require('express')

const getBets = require('../controllers/getBets')
const games = require('../controllers/games')

const listofRoutes = express.Router()

listofRoutes.post('/updateresults', games.updateResults)
listofRoutes.get('/results', games.results)
listofRoutes.get('/getbets', getBets.getBets)
listofRoutes.get('/saveuser', getBets.saveUser)


module.exports = listofRoutes
