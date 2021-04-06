const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/getBalance', controllers.getBalance);
router.get('/addFunds', controllers.addFunds);

module.exports = router;