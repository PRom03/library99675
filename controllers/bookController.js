const Book = require('../models/Book');
//const Author = require('../models/Author');
//const Publisher = require('../models/Publisher');

exports.index = async (req, res) => {
    const books = await Book.find(undefined, undefined, undefined)/*.populate('author').populate('publisher')*/;
    res.render('books/index', { books, user: req.user });
};
/*
exports.create = async (req, res) => {
    const authors = await Author.find();
    const publishers = await Publisher.find();
    res.render('books/create', { authors, publishers });
};

exports.store = async (req, res) => {
    try {
        const { title, isbn, year_of_publication, author, publisher, available } = req.body;
        await Book.create({ title, isbn, year_of_publication, author, publisher, available });
        res.redirect('/books');
    } catch (err) {
        res.status(400).send('Validation error: ' + err.message);
    }
};

exports.show = async (req, res) => {
    const book = await Book.findOne({ isbn: req.params.isbn }).populate('author').populate('publisher');
    res.render('books/show', { book });
};

exports.edit = async (req, res) => {
    const book = await Book.findOne({ isbn: req.params.isbn });
    const authors = await Author.find();
    const publishers = await Publisher.find();
    res.render('books/edit', { book, authors, publishers });
};

exports.update = async (req, res) => {
    const { title, isbn, year_of_publication, author, publisher, available } = req.body;
    await Book.findOneAndUpdate({ isbn: req.params.isbn }, {
        title, isbn, year_of_publication, author, publisher, available
    });
    res.redirect('/books');
};

exports.destroy = async (req, res) => {
    await Book.findOneAndDelete({ isbn: req.params.isbn });
    res.redirect('/books');
};
*/