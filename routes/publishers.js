const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');
const {authenticate, authorize} = require("../middleware/auth");
const {validatePublisher, handleValidationErrors} = require("../middleware/validation");

router.get('/', publisherController.index);


router.post('/', authenticate,authorize(['Admin']),validatePublisher,handleValidationErrors,publisherController.store);

router.get('/:_id', publisherController.show);

router.patch('/:_id', authenticate,authorize(['Admin']),validatePublisher,handleValidationErrors,publisherController.update);

router.delete('/:_id', authenticate,authorize(['Admin']),publisherController.destroy);

module.exports = router;