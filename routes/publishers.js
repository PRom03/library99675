const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');

// Wyświetlenie wszystkich książek
router.get('/', publisherController.index);



// Obsługa wysłania formularza (dodanie książki do bazy)
router.post('/', publisherController.store);

// Szczegóły konkretnej książki
router.get('/:_id', publisherController.show);

// Formularz edycji istniejącej książki

// Obsługa wysłania formularza edycji
router.patch('/:_id/update', publisherController.update);

// Usunięcie książki
router.delete('/:_id/delete', publisherController.destroy);

module.exports = router;