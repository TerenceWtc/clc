var success = {
  'status': '200',
  'message': {'success': 'Delete Successful.'}
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
  success: success,
  forbidden: forbidden,
  error: error
}
