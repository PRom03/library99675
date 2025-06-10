const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const cors = require('cors');

app.use(cors());
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





app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));
app.use('/publishers', require('./routes/publishers'));

app.use('/categories', require('./routes/categories'));

app.use('/users', require('./routes/users'));
app.use('/favorites', require('./routes/favorites'));
app.use('/loans', require('./routes/loans'));
app.use('/search',require('./routes/search'));
app.use('/recommended', require('./routes/recommendations'));
const cron = require('node-cron');
const Loan = require('./models/Loan');

cron.schedule('0 0 * * *', async () => {
    try {
        const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

        const expiredReservations = await Loan.find({
            status: 'reserved',
            createdAt: { $lt: fourteenDaysAgo }
        });

        for (const loan of expiredReservations) {
            loan.status = 'cancelled'; // lub np. await loan.deleteOne()
            await loan.save();
            console.log(`Anulowano rezerwację o ID: ${loan._id}`);
        }

    } catch (err) {
        console.error('Błąd podczas anulowania rezerwacji:', err);
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
