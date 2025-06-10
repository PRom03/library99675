const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');
const {authenticate, authorize} = require("../middleware/auth");
const {getRecommendations} = require("../controllers/recommendationsController");

router.get('/', authenticate,getRecommendations);
module.exports = router;