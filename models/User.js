const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    email: String,
    email_verified_at: Date,
    password: String,
    remember_token: String,
    created_at: Date,
    updated_at: Date
}, { collection: 'users' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('users', userSchema);