var s3 = require("../aws/s3");
var log4js = require('../log/log-config')
var logger = log4js.getLogger('console')

var upload = (body) => {
  return new Promise((resolve, reject) => {
    // validate request body
    if(!validateUploadBody(body)) {
      reject('error')
    }
    logger.debug('validated upload body.')
    // upload into S3
    s3.upload(body).then((result) => {
      logger.debug('upload result:', result)
      if (result) {
        resolve('success')
      } else {
        resolve('error')
      }
    })
  }).catch(err => {
    logger.error('upload err:', err)
  })
}

var deleteAttachment = (body) => {
  return new Promise((resolve, reject) => {
    // validate request body
    if (!validateDeleteBody(body)) {
      reject('error')
      return
    }
    logger.debug('validated delete body.')
    // delete in S3
    let result = s3.deleteAttachment(body)
    if (result) {
      resolve('success')
    } else {
      resolve('error')
    }
  })
}

var create = (body) => {

}

var createInternal = (body) => {

}

var getFolder = (body) => {
  return new Promise((resolve, reject) => {
    var keyName = body.srGuid + '/'
    s3.get(keyName)
  })
}

/*async var s3upload = (srGuid, attachments) => {
  
}*/

var validateUploadBody = (body) => {

  if (!body.srGuid) {
    return false
  }

  if (body.attachments.length == 0) {
    return false
  }
  
  for (let i = 0; i < body.attachments.length; i++) {
    if (!body.attachments[i].attachment || !body.attachments[i].attachmentType || !body.attachments[i].attachmentName || !body.attachments[i].attachmentDesc) {
      return false
    }
  }

  return true

}

var validateDeleteBody = (body) => {
  if (!body.srGuid) {
    return false
  }
  if (body.attachments.length == 0) {
    return false
  }
  for (let i = 0; i < body.attachments.length; i++) {
    if (!body.attachments[i].attachmentType || !body.attachments[i].attachmentName) {
      return false
    }
  }
  return true
}

module.exports = {
  upload: upload,
  deleteAttachment: deleteAttachment,
  create: create,
  createInternal: createInternal,
  getFolder: getFolder
}