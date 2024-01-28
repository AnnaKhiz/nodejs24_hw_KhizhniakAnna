const config = require('config');
const colors = require('colors/safe');

const logger = (param) => {

	return {
		info: (...args) => config.logLevel === 'info'
			? console.log(colors.bgWhite(`${param}:`), ...args) : false,
		warn: (...args) => config.logLevel === 'warn' || config.logLevel === 'info' || !config.logLevel
			? console.error(colors.bgYellow(`${param}:`), ...args) : false,
		error: (...args) => config.logLevel === 'error' || config.logLevel === 'info' || config.logLevel === 'warn' || !config.logLevel
			? console.error(colors.bgRed(`${param}:`), ...args) : false,
	}
}

module.exports = logger