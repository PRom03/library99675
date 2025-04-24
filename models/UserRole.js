const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },

}, { collection: 'user_role' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('user_role', userRoleSchema);