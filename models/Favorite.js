const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
    book_isbn: String,
    user_id: Number
}, { collection: 'favorite' });

module.exports = mongoose.model('favorite', favoriteSchema);