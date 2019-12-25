var express = require("express");
const app = express();
var router = require("./router/router")
var bodyParser = require('body-parser')
var log4js = require('./log/log-config');
var sendResponse = require('./services/send-response')

app.use(bodyParser.urlencoded({limit:'50mb', extended: true}))
app.use(bodyParser.json({limit:'50mb'}));

// log
var logger = log4js.getLogger()
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO}))
// log for debug
var loggerDebug = log4js.getLogger('console')

// Authentication
app.use((req, res, next) => {
  loggerDebug.debug('api url:', req.url)
  loggerDebug.debug('request body:', req.body)
  let accessToken = req.headers.authorization
  loggerDebug.debug('token:', accessToken)
  if (verify(accessToken)) {
    next()
  } else {
    sendResponse(res, 'forbidden')
  }
})

// verify token
var verify = (accessToken) => {
  return true
}

const port = 5555;

app.listen(port, (err) => {
  if(err) {
    logger.error(err)
  } else {
    logger.info('server running at: http://localhost:' + port)
  }
})

app.use(router)
