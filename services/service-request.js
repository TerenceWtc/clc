var s3 = require("../aws/s3");
var log4js = require('../log/log-config')
var logger = log4js.getLogger('console')

var upload = (body) => {
  return new Promise(async (resolve, reject) => {
    // validate request body
    if(!validateUploadBody(body)) {
      reject('error')
      return
    }
    logger.debug('validated upload body.')

    // upload into S3
    let srGuid = body.srGuid
    let result = true
    for (let element of body.attachments) {
      let key = srGuid + '/' + element.attachmentName
      let attachment = element.attachment
      result = await s3.upload(key, attachment) && result
    }
    // logger.debug('upload result:', result)
    if (!result) {
      reject('error')
      return
    }
    logger.debug('upload success.')

    // TODO: write into dynamodb

    resolve('success_upload')
  }).catch(err => {
    logger.error('upload error:', err)
    return 'error'
  })
}

var deleteAttachment = (body) => {
  return new Promise(async (resolve, reject) => {
    // validate request body
    if (!validateDeleteBody(body)) {
      reject('error')
      return
    }
    logger.debug('validated delete body.')

    // delete in S3
    // TODO: loop
    let srGuid = body.srGuid
    let result = true
    for (let element of body.attachments) {
      let key = srGuid + '/' + element.attachmentName
      result = await s3.deleteAttachment(key) && result
    }
    // logger.debug('delete result:', result)
    if (!result) {
      reject('error')
      return
    }
    logger.debug('delete success.')

    // TODO: write into dynamodb

    resolve('success_delete')
  }).catch(err => {
    logger.error('delete error: ', err)
    return 'error'
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

  for (let element of body.attachments) {
    if (!element.attachment || !element.attachmentType || !element.attachmentName || !element.attachmentDesc) {
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

  for (let element of body.attachments) {
    if (!element.attachmentType || !element.attachmentName) {
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