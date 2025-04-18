const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: String,
    loan_date: Date,
    return_date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
    status: String,
    prolonged: Boolean,
    penalty: Number
}, { collection: 'loan' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('loan', loanSchema);