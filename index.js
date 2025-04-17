const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
