const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { authenticate, authorize } = require('../middleware/auth');

// Wszystkie trasy wymagają uwierzytelnienia
router.use(authenticate);

// Pobierz wszystkie wypożyczenia (admin/asystent: wszystkie, user: własne)
router.get('/', loanController.getLoans);

// Utwórz rezerwację książki (tylko user)
router.post('/', authorize(['User']), loanController.createLoan);

// Usuń rezerwację (tylko user)
router.delete('/:_id', authorize(['User']), loanController.deleteLoan);

// Oznacz jako wypożyczoną (tylko asystent)
router.patch('/mark-loaned/:_id', authorize(['assistant']), loanController.markLoaned);

// Oznacz jako zwróconą (tylko asystent)
router.patch('/mark-returned/:_id', authorize(['assistant']), loanController.markReturned);

// Przedłuż wypożyczenie (tylko user)
router.patch('/prolong/:_id', authorize(['User']), loanController.prolongLoan);

// Nalicz kary (tylko admin/asystent)
router.post('/calculate-penalties', authorize(['assistant', 'Admin']), loanController.calculatePenalties);

module.exports = router;
