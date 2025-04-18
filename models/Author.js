const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    first_name: String,
    last_name: String,
    birthyear: Number,
    brief_bio: String,
    image_source: String
}, { collection: 'author' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('author', authorSchema);