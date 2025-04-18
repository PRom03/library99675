const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    image_source: String
}, { collection: 'publisher' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('publisher', publisherSchema);