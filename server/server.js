import express from 'express'

const app = express()

// test route to return some JSON to client
// Using this for health check by load balancer on AWS so DO NOT DELETE THIS ROUTE
app.get('/health', (req, res) => {
  res.send({
    data: {
      name: 'Sookie',
    },
  })
})

// Serve static files from the React app?? i think this might break for a true build?
app.use(express.static(__dirname + '/../dist'))

// routing ---------------------------------------------------------

// app.use(config.apiPrefix, routes)

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const config = require('../webpack/webpack.dev.js')
  const compiler = webpack(config)
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath: config.output.publicPath,
    }),
  )

  app.use(require("webpack-hot-middleware")(compiler));

  app.use('*', function(req, res, next) {
    let filename = path.join(compiler.outputPath, 'index.html')
    console.log(filename)
    compiler.outputFileSystem.readFile(filename, function(err, result) {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../app/dist/index.html'))
})

// error handling --------------------------------------------------

app.use(function(err, req, res, next) {
  res.header('Content-Type', 'application/json')
  var send = { error: '' }
  var http_code = typeof err.http_code === 'undefined' ? 500 : err.http_code
  if (typeof err.message !== 'undefined' && err.message !== '') {
    send.error = err.message
  } else {
    if (err.http_code == 400) {
      send.error = 'there was something wrong with that request'
    } else if (err.http_code == 401) {
      send.error = 'you are not authorized to do that'
    } else if (err.http_code == 404) {
      send.error = 'that resource was not found'
    } else if (err.http_code == 403) {
      send.error = 'access denied'
    } else {
      send.error = 'there was a problem'
    }
  }
  res.status(http_code).send(send)
})

const port = process.env.PORT || 3000
app.listen(port)

console.log(`Server listening on ${port}`)

// For Docker
process.on('SIGINT', function() {
  console.log('Caught Ctrl+C...')
  process.exit()
}) // Ctrl+C
process.on('SIGTERM', function() {
  console.log('Caught kill...')
  process.exit()
}) // docker stop