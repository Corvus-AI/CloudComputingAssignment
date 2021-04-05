const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/getBalance', controllers.getBalance);

module.exports = router;