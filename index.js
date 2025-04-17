const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://127.0.0.1:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Połączono z MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Błąd połączenia z MongoDB:', err);
});

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    helpers: {
        eq: (a, b) => a === b,
        gt: (a, b) => a > b,
        and: (a, b) => a && b
    }
}));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    // symulacja zalogowanego użytkownika
    req.user = { role_name: 'Admin' }; // lub 'User'
    next();
});

app.use('/books', require('./routes/books'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
