var success_upload = {
  'status': '200',
  'message': {'success': 'Upload Successful.'}
}

var success_delete = {
  'status': '200',
  'message': {'success': 'Delete Successful.'}
}

var success_create = {
  'status': '200',
  'message': {'pending': 'SR creation in process.'}
}

var forbidden = {
  'status': '401',
  'message': {'error': 'Authentication failure.'}
}

var error = {
  'status': '500',
  'message': {'error': 'Something went wrong. Please try again later.'}
}

module.exports = {
  success_upload: success_upload,
  success_delete: success_delete,
  success_create: success_create,
  forbidden: forbidden,
  error: error
}
