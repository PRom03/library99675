const mongoose = require('mongoose');
if (mongoose.models.Role) {
    delete mongoose.models.Role;
}
const roleSchema = new mongoose.Schema({
    role_name: String
}, { collection: 'role' }); // ważne: kolekcja może nie być domyślnie liczba mnoga

module.exports = mongoose.model('Role', roleSchema);