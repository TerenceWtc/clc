var aws = require('./aws');
var awsConfig = require('./aws-config');
var log4js = require('../log/log-config')
var logger = log4js.getLogger('console')

var upload = (body) => {
  let keyName = body.srGuid + '/' + body.attachments[0].attachmentName
  let params = {Bucket: awsConfig.bucketName, Key: keyName, Body: body.attachments[0].attachment}
  return new Promise((resolve, reject) => {
    aws.s3.putObject(params, (err, data) => {
      if (err) {
        logger.error(err)
        resolve(false)
      } else {
        logger.debug('Successfully uploaded data to ' + awsConfig.bucketName + '/' + keyName)
        logger.debug(data)
        resolve(true)
      }
    })
  })
}

var deleteAttachment = (body) => {
  let params = {
    Bucket: awsConfig.bucketName,
    Key: body.srGuid
  }
  return new Promise(resolve => {
    aws.s3.deleteObject(params, (err, data) => {
      if (err) {
        logger.error(err)
        resolve(false)
      } else {
        logger.debug(data)
        resolve(true)
      }
    })
  })
}

var get = (keyName) => {
  var params = {Bucket: awsConfig.bucketName, Key: keyName};
  aws.s3.getObject(params, function(err, data) {
    if (err)
      logger.error(err)
    else 
      logger.debug(data)
  });
}

module.exports = {
  upload: upload,
  deleteAttachment: deleteAttachment,
  get: get
}
