const knexLib = require('knex');
const knexConfig = require('../knexfile');
const knex = knexLib(knexConfig);


async function getData(req, resp, next) {
	const result = await knex.select().from('USERS');
	resp.send(result);
}

async function getDataById(req, resp, next) {
	const { id } = req.params;
	const result = await knex.select().from('USERS').where({ id }).first()
	result ? resp.send(result) : resp.status(404).send({ "result": "no users found" });
}

async function postData(req, resp, next) {
	const { body: metaData } = req;
	const [result] = await knex('USERS').insert(metaData).returning('*');
	resp.status(201).send(result);
}

async function deleteData(req, resp, next) {
	const { id } = req.params;
	const result = await knex('USERS').delete().where({ id });
	result ? resp.status(204).send({ result: "successfully deleted" }) : resp.status(404).send({ "result": "no user found" })
}

module.exports = {
	getData,
	getDataById,
	postData,
	deleteData
}