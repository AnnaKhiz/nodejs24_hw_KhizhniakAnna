
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validUserDataMiddleware(req, resp, next) {

	if (!req.body.username) {
		resp.status(400)
		resp.send('The field "username" is empty')
		return
	}

	if (!req.body.email) {
		resp.status(400)
		resp.send('The field "email" is empty');
		return
	}

	if (!emailRegex.test(req.body.email)) {
		resp.status(400)
		resp.send('Email is not correct. It should looks like example@mail.com');
		return
	}

	next();
}

module.exports = validUserDataMiddleware