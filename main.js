//require('dotenv').config();
const config = require('config');
const logger = require('./utils/logger');
const colors = require('colors/safe');
// const fileSync = require('./file_sync');
// fileSync.start();

config.isColorUsed ? colors.enable() : colors.disable();

// logger('main').info('the script is running!');
// logger('main').warn('this is warn');
// logger('main').error('this is error');



