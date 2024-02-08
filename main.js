require('dotenv').config();

const config = require('config');
const logger = require('./utils/logger')('main');
const colors = require('colors/safe');

config.isColorUsed ? colors.enable() : colors.disable();

logger.info('the script is running!');
logger.warn('this is warn');
logger.error('this is error');


