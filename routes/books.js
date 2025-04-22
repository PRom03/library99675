const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Wyświetlenie wszystkich książek
router.get('/', bookController.index);



// Obsługa wysłania formularza (dodanie książki do bazy)
router.post('/', bookController.store);

// Szczegóły konkretnej książki
router.get('/:isbn', bookController.show);

// Formularz edycji istniejącej książki

// Obsługa wysłania formularza edycji
router.patch('/:isbn/update', bookController.update);

// Usunięcie książki
router.delete('/:isbn/delete', bookController.destroy);

module.exports = router;
