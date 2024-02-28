require('dotenv').config();
const logger = require('./utils/logger')('server');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path')
const { validIDMiddleware, validUserDataMiddleware } = require("./middleware");
const port = 3030;


const server = express();
const router = express.Router();
const dbPath = path.join('.', 'database', 'users.json');

let usersData;

const jsonBodyParser = express.json();
server.use(jsonBodyParser);

async function checkDirectory() {
	try {
		await fs.promises.mkdir(path.join('.', 'database'))
		await fs.promises.writeFile(dbPath, '');
	} catch (error) {
		if (error.code !== 'EEXIST') {
			logger.error(error);
		}
	}
}
checkDirectory();

server.listen(port, () => {
	logger.info(`Server started on ${port} port`);

	fs.promises.readFile(dbPath, 'utf8')
		.then(res => {
			if (res) {
				usersData = JSON.parse(res);
			} else {
				usersData = {};
				console.log('Database is empty');
			}
		});
});

const accessLogStream = fs.createWriteStream(path.join('logs', 'server-express-logs.log'), { flags: 'a' });

server.use(morgan(':method :url :status', { stream: accessLogStream }));
server.use(morgan(':method :url :status'));

server.use('/users', router);

server.use('/users/7', router);


//!routes
router.get('/', (req, resp) => {
	usersData.users ? resp.send(usersData.users) : resp.send('Empty database');
})

router.get('/:userId', validUserDataMiddleware, (req, resp) => {
	if (usersData.users) {
		const id = req.params.userId;

		const user = usersData.users.find(element => element.id === Number(id));

		if (!user) {
			resp.status(404);
			resp.send('User not found');
		}

		resp.send(user);
	} else {
		resp.send('Empty database');
	}
})

router.post('/', validUserDataMiddleware, (req, resp) => {
	if (usersData.users) {
		resp.status(201)
		usersData.users.push(req.body);
		resp.send(req.body);
	} else {
		usersData.users = [];
		usersData.users.push(req.body);
		resp.send(req.body);
	}
})

router.delete('/:userId', validIDMiddleware, (req, resp) => {
	if (usersData.users) {
		const id = req.params.userId;
		const index = usersData.users.findIndex(element => element.id === Number(id));
		if (index === -1) {
			resp.status(404);
			resp.send('User not found');
		}

		usersData.users.splice(index, 1);
		resp.status(204);
		resp.send('User was deleted successfully');
	} else {
		resp.send('Empty database');
	}

})


function stopServer() {
	accessLogStream.end();

	fs.writeFile(dbPath, JSON.stringify(usersData), () => {
		console.log('File successfully writen');
	});
}

process.on('SIGINT', stopServer);