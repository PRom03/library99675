const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
}, { collection: 'category' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('category', categorySchema);