const http = require('http');
const logger = require('./utils/logger')('server');
const port = 3000;

// const server = http.createServer();


// server.listen(port);

// server.on('listening', () => logger.info(`Server started on ${port} port`));

// server.on('request', (request, response) => {

// 	if (request.url === '/healthcheck' && request.method === 'GET') {
// 		response.writeHead(200);
// 		response.write('healthcheck passed');
// 		logger.info(`${request.method} ${request.url} ${response.statusCode}`);
// 	} else {
// 		response.writeHead(404);
// 		logger.warn(`${request.method} ${request.url} ${response.statusCode}`);
// 	}

// 	response.end();

// })