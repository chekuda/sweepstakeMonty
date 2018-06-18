require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const helmet = require('helmet')
const cors = require('cors')

const dbconnection = require('./dbconnection/config')
const Routes = require('./routes/routes')

const app = express()
app.use(cors())
app.use(helmet())

const dbUrl = process.env.ENV !== 'prod'
  ? process.env.LOCAL_DB_URL
  : process.env.REMOTE_DB_URL

dbconnection.createDBConnection(dbUrl)

const port = process.env.PORT || 5000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', Routes)

app.get('/', (req, res) => {
  res.send('Welcome To Chekuda API')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
