const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticate} = require("../middleware/auth");

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/me',authenticate,userController.getMe)
router.patch('/me/edit',authenticate,userController.editMe)




module.exports = router;