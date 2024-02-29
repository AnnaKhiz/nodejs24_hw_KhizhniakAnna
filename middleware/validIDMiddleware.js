function validIDMiddleware(req, resp, next) {
	const id = req.params.id;

	if (!Number.isInteger(Number(id)) || Number(id) < 0) {
		resp.status(400)
		resp.send('ID value isn\'t correct');
		return
	}

	next();
}

module.exports = validIDMiddleware