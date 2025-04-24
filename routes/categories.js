const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Wyświetlenie wszystkich książek
router.get('/', categoryController.index);



// Obsługa wysłania formularza (dodanie książki do bazy)
router.post('/', categoryController.store);

// Szczegóły konkretnej książki
router.get('/:_id', categoryController.show);

// Formularz edycji istniejącej książki

// Obsługa wysłania formularza edycji
router.patch('/:_id/update', categoryController.update);

// Usunięcie książki
router.delete('/:_id/delete', categoryController.destroy);

module.exports = router;