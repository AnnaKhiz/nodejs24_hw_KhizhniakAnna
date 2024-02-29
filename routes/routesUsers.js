const express = require('express');
const server = express();
const router = express.Router();
const { validIDMiddleware, validUserDataMiddleware } = require("../middleware");
const { getData, getDataById, postData, deleteData } = require("../services/users")


router.get('/', getData);

router.get('/:id', validIDMiddleware, getDataById);

router.post('/', validUserDataMiddleware, postData);

router.delete('/:id', validIDMiddleware, deleteData);

module.exports = { router }