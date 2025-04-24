
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Wyświetlenie wszystkich książek
router.get('/', authorController.index);



// Obsługa wysłania formularza (dodanie książki do bazy)
router.post('/', authorController.store);

// Szczegóły konkretnej książki
router.get('/:_id', authorController.show);

// Formularz edycji istniejącej książki

// Obsługa wysłania formularza edycji
router.patch('/:_id/update', authorController.update);

// Usunięcie książki
router.delete('/:_id/delete', authorController.destroy);

module.exports = router;