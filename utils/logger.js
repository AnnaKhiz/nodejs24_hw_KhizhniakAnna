const config = require('config');
const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');

function checkDirectory() {
	fs.mkdir(path.join('.', 'logs'), (error) => {
		if (error && error.code === 'EEXIST') {
			console.log('Directory already exist');
		} else if (error) {
			console.log(error);
		}
	})
}

checkDirectory();

const writeStreamError = fs.createWriteStream(path.join('.', 'logs', 'error.log'), { encoding: 'utf8', flags: 'a' });
const writeStreamInfo = fs.createWriteStream(path.join('.', 'logs', 'info.log'), { encoding: 'utf8', flags: 'a' });

const logger = (param) => {
	return {
		info: (...args) => {
			if (config.logLevel === 'info') {
				console.log(colors.green(`${param}:`), ...args);
			}
			writeStreamInfo.write(`${param}: ${new Date().toISOString()} - ${args}\n`);
		},
		warn: (...args) => {
			if (config.logLevel === 'warn' || config.logLevel === 'info') {
				console.error(colors.bgYellow(`${param}:`), ...args);
			}
			writeStreamError.write(`${param}: ${new Date().toISOString()} - ${args}\n`);
		},
		error: (...args) => {
			if (config.logLevel === 'error' || config.logLevel === 'info' || config.logLevel === 'warn') {
				console.error(colors.bgRed(`${param}:`), ...args);
			}
			writeStreamError.write(`${param}: ${new Date().toISOString()} - ${args}\n`);
		}
	}
}

process.on('beforeExit', () => {
	writeStreamError.end();
	writeStreamInfo.end();
})


module.exports = logger