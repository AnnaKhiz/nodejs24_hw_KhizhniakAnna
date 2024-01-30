const logColor = process.env.COLORS_ENABLED && process.env.COLORS_ENABLED == 1 ? 1 : 0;

const logLevel = (function () {
	switch (process.env.LOG_LEVEL) {
		case 'info':
			return 'info';
		case 'error':
			return 'error';
		default:
			return 'warn';
	}
})();

module.exports = {
	logColor,
	logLevel,
}
