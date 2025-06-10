const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {authenticate, authorize} = require("../middleware/auth");
const {validateBook, handleValidationErrors} = require("../middleware/validation");

router.get('/', bookController.index);

router.post('/', authenticate,authorize(['Admin']),validateBook,handleValidationErrors,bookController.store);

router.get('/:isbn', bookController.show);


router.patch('/:isbn', authenticate,authorize(['Admin']),validateBook,handleValidationErrors,bookController.update);

router.delete('/:isbn', authenticate,authorize(['Admin']),bookController.destroy);

module.exports = router;
