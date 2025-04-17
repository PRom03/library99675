const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /books
router.get('/', bookController.index);

module.exports = router;
