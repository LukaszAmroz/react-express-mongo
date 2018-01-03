const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Initialize Express App
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set Env Variables
require('dotenv').config()

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

// Initialize MongoDB connection
mongoose.connect(process.env.DB_URI, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log(`Database is listening on port ${process.env.DB_PORT}`)
})
mongoose.Promise = global.Promise

if (isDev) {
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '..', 'client', 'public'),
    stats: {
      colors: true
    },
    noInfo: true
  }))

  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.resolve(__dirname, '..', 'dist')))
}

// Import routes
const api = require('./routes/api')

// Set routes
app.use('/api', api)

// Import models
require('./models/User')

app.listen(port, (err) => {
  if (err) {
    console.error(err)
  }
  console.info(`App is listening on port ${port}`)
})
