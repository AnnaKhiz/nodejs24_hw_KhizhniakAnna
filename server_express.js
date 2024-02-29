require('dotenv').config();
const logger = require('./utils/logger')('server');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const port = 3030;
const { router: routerUsers } = require('./routes/routesUsers')

const server = express();

const jsonBodyParser = express.json();
server.use(jsonBodyParser);


server.listen(port, async () => {
	logger.info(`Server started on ${port} port`);
});

const accessLogStream = fs.createWriteStream(path.join('logs', 'server-express-logs.log'), { flags: 'a' });

server.use(morgan(':method :url :status', { stream: accessLogStream }));
server.use(morgan(':method :url :status'));

server.use('/users', routerUsers);

function stopServer() {
	accessLogStream.end();
}

process.on('SIGINT', stopServer);