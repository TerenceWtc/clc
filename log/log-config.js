var log4js = require('log4js')

log4js.configure(
  {
    appenders: {
      fileLog: {
        type: 'file',
        filename: __dirname + '/logs/log',
        pattern: 'yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        encoding: 'utf-8',
        // 10 * 1024 * 1024
        maxLogSize: 10485760
      },
      console: {
        type: 'console'
      }
    },
    categories: {
      default: {
        appenders: ['fileLog', 'console'],
        level: 'info'
      },
      console: {
        appenders: ['console'],
        level: 'debug'
      }
    }
  }
)

module.exports = log4js
