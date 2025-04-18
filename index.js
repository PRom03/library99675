const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const Book = require('./models/Book');
const Author = require('./models/Author');
const Publisher = require('./models/Publisher');
const Category = require('./models/Category');
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

async function migrate() {
    const books = await Book.find();

    for (let book of books) {
        const category = await Category.findOne({ id: book.category_id });
        const author = await Author.findOne({ id: book.author_id });
        const publisher = await Publisher.findOne({ id: book.publisher_id });

        if (category) {
            book.set({
                author: author._id,
                publisher: publisher._id,
               category: category._id,
            });

            // usuń stare pola
            book.set('category_id', undefined, { strict: false });
            book.set('author_id', undefined, { strict: false });
            book.set('publisher_id', undefined, { strict: false });
            await book.save();
        } else {
            console.warn(`Brak dla książki: ${book.title}`);
        }
    }

    console.log('Migracja zakończona.');
}
//migrate();
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

app.use('/books', require('./routes/books'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
