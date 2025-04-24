const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const cors = require('cors');app.use(cors());
const session = require('express-session');
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.sendStatus(401);
}
function authorizeRole(...allowedRoles) {
    return (req, res, next) => {
        const user = req.session.user;
        if (user && allowedRoles.includes(user.role)) {
            return next();
        }
        res.sendStatus(403);
    };
}


app.use(express.json()); // <== TO JEST NAJWAŻNIEJSZE DLA JSONA
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
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true  // Zezwala na dostęp do właściwości prototypu
    }
}));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    // symulacja zalogowanego użytkownika
    req.user = { role_name: 'Admin' }; // lub 'User'
    next();
});
app.use(session({
    secret: 'tajny_klucz',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // secure: true jeśli HTTPS
}));
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));
app.use('/publishers', require('./routes/publishers'));

app.use('/categories', require('./routes/categories'));

app.use('/users', require('./routes/users'));
app.use('/favorites', require('./routes/favorites'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
