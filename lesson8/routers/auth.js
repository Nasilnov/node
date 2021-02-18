const express = require('express');
const controllers = require('../controllers')

const router = express.Router();

router.get('/login/', controllers.auth.getLogin);
router.post('/login/', controllers.auth.postLogin);
router.post('/logout/', controllers.auth.postLogout);

module.exports = router;