
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validUserDataMiddleware(req, resp, next) {
	const id = Date.now();

	req.body.id = id;

	if (!req.body.username) {
		resp.status(400)
		resp.send('The field "username" is empty')

	}

	if (!req.body.email) {
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