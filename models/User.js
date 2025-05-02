const mongoose = require('mongoose');
if (mongoose.models.User) {
    delete mongoose.models.User;
}

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String,unique:true},
    email_verified_at: Date,
    password: String,
    remember_token: String,
    created_at: Date,
    updated_at: Date,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
}, { collection: 'users' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports =  mongoose.model('User', userSchema);