'use strict'
import express from 'express';
import httpErrors from 'http-errors';
import path from 'path';
import pino from 'pino';
import pinoHttp from 'pino-http';
import bodyParser from 'body-parser';
import router from './routes';

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('connected', function() {
  console.log('Mongoose connection open');
});

db.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

const ready = function () {}
const opts = {
  port: 8000,
  host: 'localhost'
}

const logger = pino({
  prettyPrint: true
});

// Server state
let server
let serverStarted = false
let serverClosing = false

// Setup error handling
function unhandledError (err) {
  // Log the errors
  logger.error(err)

  // Only clean up once
  if (serverClosing) {
    return
  }
  serverClosing = true

  // If server has started, close it down
  if (serverStarted) {
    server.close(function () {
      process.exit(1)
    })
  }
}
process.on('uncaughtException', unhandledError)
process.on('unhandledRejection', unhandledError)

// Create the express app
const app = express()

// Common middleware
// app.use(/* ... */)
app.use(pinoHttp({ logger }))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Register routes
// @NOTE: require here because this ensures that even syntax errors
// or other startup related errors are caught logged and debuggable.
// Alternativly, you could setup external log handling for startup
// errors and handle them outside the node process.  I find this is
// better because it works out of the box even in local development.
router(app);

// Common error handlers
app.use(function fourOhFourHandler (req, res, next) {
  next(httpErrors(404, `Route not found: ${req.url}`))
})
app.use(function fiveHundredHandler (err, req, res, next) {
  if (err.status >= 500) {
    logger.error(err)
  }
  res.locals.name = 'backend'
  res.locals.error = err
  res.status(err.status || 500).render('error')
})

// Start server
server = app.listen(opts.port, opts.host, function (err) {
  if (err) {
    return ready(err, app, server)
  }

  // If some other error means we should close
  if (serverClosing) {
    return ready(new Error('Server was closed before it could start'))
  }

  serverStarted = true
  const addr = server.address()
  logger.info(`Started at ${opts.host || addr.host || 'localhost'}:${addr.port}`)
  ready(err, app, server)
})

