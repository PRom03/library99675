const Book = require('../models/Book');
const Author = require('../models/Author');
const Publisher = require('../models/Publisher');
const Category = require('../models/Category');
exports.index = async (req, res) => {
    try {
        const books = await Book.find().populate('author').populate('publisher').populate('category');
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.store = async (req, res) => {
    try {
        const { title, isbn, year_of_publication, author, publisher,category, available } = req.body;
        const newBook = await Book.create({ title, isbn, year_of_publication, author, publisher, category,available });
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.show = async (req, res) => {
    try {
        const book = await Book.findOne({isbn:req.params.isbn}).populate('author').populate('publisher');
        if (!book) return res.status(404).json({ message: 'Książka nie znaleziona' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { title, isbn, year_of_publication, author, publisher, category, available } = req.body;

        const updated = await Book.findOneAndUpdate(
            {isbn: req.params.isbn},
            { title, isbn, year_of_publication, author, publisher,category, available },
            { new: true }
        ).populate('author').populate('publisher').populate('category');

        if (!updated) return res.status(404).json({ message: 'Książka nie znaleziona' });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.destroy = async (req, res) => {
    try {
        const deleted = await Book.findOneAndDelete({ isbn: req.params.isbn });
        if (!deleted) return res.status(404).json({ message: 'Książka nie znaleziona' });
        res.json({ message: 'Usunięto książkę', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
