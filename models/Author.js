const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    birthyear: Number,
    brief_bio: String,
    image_source: String
}, { collection: 'author' });

module.exports = mongoose.model('author', authorSchema);