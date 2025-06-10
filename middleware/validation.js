const { body, validationResult } = require('express-validator');
const router = require("../routes/books");
exports.validateAuthor = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('Imię jest wymagane')
        .isAlpha('pl-PL', { ignore: ' -' }).withMessage('Imię może zawierać tylko litery'),

    body('last_name')
        .trim()
        .notEmpty().withMessage('Nazwisko jest wymagane')
        .isAlpha('pl-PL', { ignore: ' -' }).withMessage('Nazwisko może zawierać tylko litery'),

    body('birthyear')
        .notEmpty().withMessage('Rok urodzenia jest wymagany')
        .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Nieprawidłowy rok'),

    body('image_source')
        .notEmpty().withMessage('Źródło wizerunku jest wymagane')
        .isURL().withMessage('Nieprawidłowy URL obrazka'),

    body('brief_bio')
        .notEmpty().withMessage('Nota biograficzna jest wymagane')
        .trim()
        .isLength({ max: 1000 }).withMessage('Biogram może mieć maksymalnie 1000 znaków')
];
exports.validateBook = [
    body('title')
        .notEmpty().withMessage('Tytuł jest wymagany')
        .isLength({ max: 200 }).withMessage('Tytuł może mieć maksymalnie 200 znaków'),

    body('isbn')
        .notEmpty().withMessage('ISBN jest wymagany')
        .matches(/^\d{13}$/).withMessage('ISBN powinien zawierać  13 cyfr'),

    body('year_of_publication')
        .notEmpty().withMessage('Rok wydania jest wymagany')
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage(`Rok wydania musi być liczbą całkowitą z zakresu 1000-${new Date().getFullYear()}`),

    body('available')
        .notEmpty().withMessage('Liczba dostępnych egzemplarzy jest wymagana')
        .isInt({ min: 0 }).withMessage('Liczba dostępnych egzemplarzy musi być liczbą ≥ 0'),
];

exports.validatePublisher = [
    body('name')
        .notEmpty().withMessage('Nazwa wydawnictwa jest wymagana')
        .matches(/^([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?$/)
        .withMessage('Nazwa wydawnictwa powinna zawierać dwa słowa zaczynające się od wielkiej litery'),

    body('image_source')
        .notEmpty().withMessage('Źródło obrazu jest wymagane')
        .isURL().withMessage('Adres obrazu powinien być poprawnym URL-em'),
];
exports.validateCategory= [
    body('name')
        .notEmpty().withMessage('Nazwa kategorii jest wymagana')
        .matches(/^([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?$/i)
        .withMessage('Nazwa kategorii powinna składać się z dwóch słów (mogą zaczynać się od małej litery)'),
];
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
