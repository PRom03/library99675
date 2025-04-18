const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Wyświetlenie wszystkich książek
router.get('/', bookController.index);



// Obsługa wysłania formularza (dodanie książki do bazy)
router.post('/', bookController.create);

// Szczegóły konkretnej książki
router.get('/:isbn', bookController.show);

// Formularz edycji istniejącej książki
router.get('/:isbn/edit', bookController.edit);

// Obsługa wysłania formularza edycji
router.post('/:isbn', bookController.update);

// Usunięcie książki
//router.post('/:isbn/delete', bookController.delete);

module.exports = router;
