const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    isbn: { type: String, unique: true },
    title: String,
    year_of_publication: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'author' },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'publisher' },
    author_id: Number,
    publisher_id: Number,
    available: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    category_id: Number
}, { collection: 'book' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('Book', bookSchema);