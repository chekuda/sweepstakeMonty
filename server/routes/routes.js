const express = require('express')

const getBets = require('../controllers/getBets')
const games = require('../controllers/games')
const qualified = require('../controllers/qualified')

const listofRoutes = express.Router()

listofRoutes.post('/updateresults', games.updateResults)
listofRoutes.post('/updatedqualified', qualified.updateQualified)
listofRoutes.post('/getqualified', qualified.getQualified)
listofRoutes.get('/updateuser', getBets.updateUser)
listofRoutes.get('/results', games.results)
listofRoutes.get('/getbets', getBets.getBets)
listofRoutes.get('/saveuser', getBets.saveUser)


module.exports = listofRoutes
