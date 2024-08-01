const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

router.get('/all-data', masterController.getAllData);

module.exports = router;
