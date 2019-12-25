var AWS = require('aws-sdk');
var awsConfig = require('./aws-config')

var s3 = new AWS.S3({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: awsConfig.region
});

var dynamoDB = new AWS.DynamoDB();

module.exports = {
  s3: s3,
  dynamoDB: dynamoDB
}
