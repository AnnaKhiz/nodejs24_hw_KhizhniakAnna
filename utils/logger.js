const colors = require('colors/safe');

const logger = (param) => {
	switch (process.env.LOG_LEVEL) {
		case 'info': 
			return {
				info: (...args) => console.log(colors.bgWhite(`${param}:`), ...args),
				warn: (...args) => console.warn(colors.bgYellow(`${param}:`), ...args),
				error: (...args) => console.error(colors.bgRed(`${param}:`), ...args),
			}
		case 'error': 
			return {
				error: (...args) => console.error(colors.bgRed(`${param}:`), ...args),
			}
		default: 
			return {
				warn: (...args) => console.warn(colors.bgYellow(`${param}:`), ...args),
				error: (...args) => console.error(colors.bgRed(`${param}:`), ...args),
			}
	}
}

module.exports = logger