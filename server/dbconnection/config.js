const mongoose = require('mongoose')

exports.createDBConnection = (dbUrl) => {
  console.log(dbUrl)
  mongoose.connect(dbUrl)

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open')
  })

  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error ' + err)
  })

  mongoose.connection.on('disconnected', err => {
    console.log('Mongoose default connection disconnected ' + err)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected through app termination')
      process.exit(0)
    })
  })
}
