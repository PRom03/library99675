const mongoose = require('mongoose');

const sessionsSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    payload: String,
    user_agent: String,
    ip_address: String,
    last_activity: Number
}, { collection: 'sessions' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('sessions', sessionsSchema);