require('dotenv').config();
const config = require('config');
const colors = require('colors/safe');

config.logColor === 'enabled' ? colors.enable() : colors.disable();

config.logger('main').info('the script is running!');
config.logger('main').warn('this is warn');
config.logger('main').error('this is error');
