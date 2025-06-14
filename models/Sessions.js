const mongoose = require('mongoose');

const sessionsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    payload: String,
    user_agent: String,
    ip_address: String,
    last_activity: Number
}, { collection: 'sessions' });

module.exports = mongoose.model('sessions', sessionsSchema);