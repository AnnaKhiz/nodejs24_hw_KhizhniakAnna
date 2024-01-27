const colors = require('colors/safe');

const logger = (param) => {

  return {
    info: (...args) => process.env.LOG_LEVEL === 'info'
      ? console.log(colors.bgWhite(`${param}:`), ...args) : false,
    warn: (...args) => process.env.LOG_LEVEL === 'warn' || process.env.LOG_LEVEL === 'info' || !process.env.LOG_LEVEL
      ? console.error(colors.bgYellow(`${param}:`), ...args) : false,
    error: (...args) => process.env.LOG_LEVEL === 'error' || process.env.LOG_LEVEL === 'info' || process.env.LOG_LEVEL === 'warn' || !process.env.LOG_LEVEL
      ? console.error(colors.bgRed(`${param}:`), ...args) : false,
  }

}

module.exports = logger