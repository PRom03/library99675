const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const {authenticate,authorize} = require("../middleware/auth");
const { validateAuthor, handleValidationErrors } = require('../middleware/validation');
router.get('/', authorController.index);



router.post('/', authenticate,authorize(['Admin']), validateAuthor,handleValidationErrors,authorController.store);

router.get('/:_id', authorController.show);

router.patch('/:_id',authenticate,authorize(['Admin']), validateAuthor,handleValidationErrors,authorController.update);

router.delete('/:_id', authenticate,authorize(['Admin']),authorController.destroy);

module.exports = router;