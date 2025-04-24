const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Wyświetlenie wszystkich książek
//router.get('/', authorController.index);



// Obsługa wysłania formularza (dodanie książki do bazy)
router.post('/login', userController.login);
router.post('/register', userController.register);

// Szczegóły konkretnej książki
//router.get('/:_id', authorController.show);

// Formularz edycji istniejącej książki

// Obsługa wysłania formularza edycji
//router.patch('/update', userController.update);

// Usunięcie książki
//router.delete('/:_id/delete', authorController.destroy);

module.exports = router;