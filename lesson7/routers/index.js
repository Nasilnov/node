const express = require('express');

const mainRouter = require('./main.js');
const taskRouter = require('./task.js');
const apiRouter = require('./api');

const router = express.Router();

router.use('/task', taskRouter);
router.use('/api', apiRouter);
router.use(mainRouter);

module.exports = router;