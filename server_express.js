require('dotenv').config();
const logger = require('./utils/logger')('server');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path')
const { validIDMiddleware, validUserDataMiddleware } = require("./middleware/index");
const port = 3000;

const server = express();
const router = express.Router();

let usersData;

const jsonBodyParser = express.json();
server.use(jsonBodyParser);

server.listen(port, () => {
	logger.info(`Server started on ${port} port`);
	fs.promises.readFile(path.join('logs', 'users.json'), 'utf8').then(res => usersData = JSON.parse(res));
});

const accessLogStream = fs.createWriteStream(path.join('logs', 'server-express-logs.log'), { flags: 'a' });

server.use(morgan(':method :url :status', { stream: accessLogStream }));
server.use(morgan(':method :url :status'));

server.use('/users', router);

server.use('/users/2', router);


//!routes
router.get('/', (req, resp) => {
	resp.send(usersData.users)
})

router.get('/:userId', validUserDataMiddleware, (req, resp) => {
	const id = req.params.userId;

	const user = usersData.users.find(element => element.id === Number(id));

	if (!user) {
		resp.status(404);
		resp.send('User not found');
	}
	resp.send(user);
})

router.post('/', validUserDataMiddleware, (req, resp) => {
	usersData.users.push(req.body);
	resp.send(req.body);
})

router.delete('/:userId', validIDMiddleware, (req, resp) => {
	const id = req.params.userId;

	const index = usersData.users.findIndex(element => element.id === Number(id));

	if (index === -1) {
		resp.status(404);
		resp.send('User not found');
	}

	usersData.users.splice(index, 1);
	resp.status(204);
	resp.send('User was deleted successfully');
})


function stopServer() {
	accessLogStream.end();
	fs.writeFile(path.join('logs', 'users.json'), JSON.stringify(usersData), () => {
		console.log('file successfully writen');
	});
}

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);