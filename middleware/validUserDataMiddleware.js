
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validUserDataMiddleware(req, resp, next) {
	id = Date.now();

	req.body = {
		"id": id,
		"username": "Test",
		"email": "Test@email.com"
	};

	if (!req.body.username || req.body.username === '') {
		resp.status(400)
		resp.send('The field "username" is empty')

	}

	if (!req.body.email || req.body.email === '') {
		resp.status(400)
		resp.send('The field "email" is empty')

	}

	if (!emailRegex.test(req.body.email)) {
		resp.status(400)
		resp.send('Email is not correct. It should looks like example@mail.com')
	}

	next()
}

module.exports = validUserDataMiddleware