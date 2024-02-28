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


// в тебе тут був конфлікт послідовності промісів.
// краще ініціалізацію бази зробити сінхронно! щоб воно гарантовано відбулось раніше ніж все інше
fs.mkdirSync(path.join('.', 'database'), { recursive: true }); // створить папку, якщо нема - не впаде якщо вже є

server.listen(port, async () => {
	logger.info(`Server started on ${port} port`);

	try {
		const data = await fs.promises.readFile(dbPath, 'utf8');
		if (data) {
			usersData = JSON.parse(data);
		}
	} catch(err) {
		logger.info('Database file is empty');

		// чому б не задати потрібну структуру одразу? Заодно позбудемось постійних перевірок на наявність ключа `users`
		usersData = { users: [] };
	}
});

const accessLogStream = fs.createWriteStream(path.join('logs', 'server-express-logs.log'), { flags: 'a' });

server.use(morgan(':method :url :status', { stream: accessLogStream }));
server.use(morgan(':method :url :status'));

server.use('/users', router);

//!routes
router.get('/', (req, resp) => {
	resp.send(usersData.users);
})

router.get('/:userId', validIDMiddleware, (req, resp) => {
		const id = req.params.userId;
		const user = usersData.users.find(element => element.id === Number(id));

	// неважливо чому юзер не знайдений - тим більше користувачам не треба давати інформацію про стан нашої бази ))
		if (!user) {
			resp.status(404);
		return resp.send('User not found');
		}

		resp.send(user);
})

router.post('/', validUserDataMiddleware, (req, resp) => {
		usersData.users.push(req.body);
	//TODO: Чому в ріспонсі немає юзер айді? ))
	resp.status(201).send(req.body);
})

router.delete('/:userId', validIDMiddleware, (req, resp) => {
		const id = req.params.userId;
		const index = usersData.users.findIndex(element => element.id === Number(id));
		if (index === -1) {
			resp.status(404);
		return resp.send('User not found');
		}

		usersData.users.splice(index, 1);
		resp.status(204);
		resp.send('User was deleted successfully');
})


function stopServer() {
	accessLogStream.end();

	fs.writeFile(dbPath, JSON.stringify(usersData), () => {
		console.log('File successfully writen');
	});
}

process.on('SIGINT', stopServer);