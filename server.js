// server.js
var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var app = express()
const history = require('connect-history-api-fallback')
app.use(serveStatic(path.join(__dirname, '/dist')))
app.use(history({
    disableDotRule: true,
    verbose: true
   }))
app.use(serveStatic(path.join(__dirname, '/dist')))
var port = process.env.PORT || 5000
app.listen(port)
// app.get('/favicon.ico', (req, res) => res.status(204));
console.log('starting project at ' + port)