const logger = require('../utils/logger');

const logColor = process.env.COLORS_ENABLED && process.env.COLORS_ENABLED == 1 ? 'enabled' : 'disabled';

module.exports = {
	logColor,
	logger
}
