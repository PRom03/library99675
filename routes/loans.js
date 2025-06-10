const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);

router.get('/',loanController.getLoans);

router.post('/', authorize(['User']), loanController.createLoan);

router.delete('/:_id', authorize(['User']), loanController.deleteLoan);

router.patch('/loaned/:_id', authorize(['assistant']), loanController.markLoaned);

router.patch('/return/:_id', authorize(['assistant']), loanController.markReturned);

router.patch('/prolong/:_id', authorize(['User','assistant']), loanController.prolongLoan);
router.post('/penalties', authorize(['assistant', 'Admin']), loanController.calculatePenalties);

module.exports = router;
