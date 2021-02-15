const express = require('express');
const controllers = require('../../controllers')
const config = require('../../config')

const router = express.Router();

taskApiRouter = require('./task.js');

router.use('/v1/task', taskApiRouter);

module.exports = router;