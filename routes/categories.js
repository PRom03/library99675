const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {authenticate, authorize} = require("../middleware/auth");
const {handleValidationErrors, validateCategory} = require("../middleware/validation");

router.get('/', categoryController.index);



router.post('/',authenticate,authorize(['Admin']), validateCategory,handleValidationErrors,categoryController.store);


router.get('/:_id', categoryController.show);

router.patch('/:_id', authenticate,authorize(['Admin']),validateCategory,handleValidationErrors,categoryController.update);

router.delete('/:_id', authenticate,authorize(['Admin']),categoryController.destroy);

module.exports = router;