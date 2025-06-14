const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: String,
    image_source: String
}, { collection: 'publisher' });

module.exports = mongoose.model('publisher', publisherSchema);