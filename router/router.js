var express = require("express");
const router = express.Router();
var serviceRequest = require("./service-request");

router.use("/clc/api/v1", serviceRequest)

module.exports = router;