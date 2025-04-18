const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    role_name: String
}, { collection: 'role' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('role', roleSchema);