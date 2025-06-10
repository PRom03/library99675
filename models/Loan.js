const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    title: String,
    loan_date: Date,
    return_date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    status: String,
    prolonged: Boolean,
    penalty: Number
}, { collection: 'loan' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.models.loan || mongoose.model('loan', loanSchema);