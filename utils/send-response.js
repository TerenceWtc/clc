var responseJson = require('../constant/response-json')

var sendResponse =  (response, result) => {
  response.status(responseJson[result].status)
  response.send(responseJson[result].message)
}

module.exports = sendResponse
