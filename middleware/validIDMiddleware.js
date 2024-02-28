function validIDMiddleware(req, resp, next) {
	const id = req.params.userId;

	if (!Number.isInteger(Number(id)) || Number(id) < 0) {
		resp.status(400)
		resp.send('ID value isn\'t correct')
	}

	next()
}

module.exports = validIDMiddleware