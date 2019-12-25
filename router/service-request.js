var express = require("express");
const router = express.Router();
var serviceRequest = require("../services/service-request")
var sendResponse = require('../utils/send-response')

/**
 * 3.3.1 upload attachments
 * Uploads service request attachment(s).
 * Request and Response will be in JSON format.
 */
router.post('/service-request/attachments/upload', (req, res) => {
  serviceRequest.upload(req.body).then(result => {
    sendResponse(res, result)
  })
})

/**
 * 3.3.2 delete attachments
 * Uploads service request attachment(s).
 * Request and Response will be in JSON format.
 */
router.post('/service-request/attachments/delete', (req, res) => {
  serviceRequest.deleteAttachment(req.body).then(result => {
    sendResponse(res, result)
  })
})

/**
 * 3.3.3 create service request for CLC
 * Creates Service Request in CRM using Jitterbit Service.
 * Request and Response will be in JSON format.
 */
router.post('/service-request/create', (req, res) => {
  serviceRequest.create(req.body)
  res.send()
})

/**
 * 3.3.4 create service request for internal flow
 * Creates Service Request in CRM.
 * Request and Response will be in JSON format.
 */
router.post('/service-request/create/internal', (req, res) => {
  serviceRequest.createInternal(req.body).then()
})

module.exports = router;