var aws = require('./aws');
var awsConfig = require('./aws-config');
var log4js = require('../log/log-config')
var logger = log4js.getLogger('console')

var upload = async (key, attachment) => {
  let params = {Bucket: awsConfig.bucketName, Key: key, Body: Buffer.from(attachment, 'base64')}
  return await aws.s3.upload(params).promise().then((data, err) => {
    if (err) {
      logger.error(err)
      return false
    } else {
      logger.debug('Successfully uploaded data to ' + awsConfig.bucketName + '/' + key)
      logger.debug(data)
      return true
    }
  })
}

var deleteAttachment = async (key) => {
  let params = {Bucket: awsConfig.bucketName,  Key: key}
  return await aws.s3.deleteObject(params).promise().then((data, err) => {
    if (err) {
      logger.error(err)
      return false
    } else {
      logger.debug(data)
      return true
    }
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
