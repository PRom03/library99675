const Loan = require('../models/loan');
const Book = require('../models/book');
const User = require('../models/user');
const Role = require('../models/role');
const dayjs = require('dayjs');

async function getUserRoleName(userId) {
    const user = await User.findById(userId).populate('role');
    return user?.role?.role_name || null;
}

const jwt = require('jsonwebtoken');

exports.getLoans = async (req, res) => {
    try {

        const roleName = req.user.role_name ;
        console.log(roleName);
        if (!req.user._id) {
            return res.status(401).json({ error: 'Nieprawidłowy token' });
        }

        let query = {};
        if (roleName === 'User') {
            query = { user: req.user._id };
        }

        const loans = await Loan.find(query).populate('book').populate('user');
        res.json(loans);

    } catch (err) {
        console.error('Błąd w getLoans:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
    }
};



exports.createLoan = async (req, res) => {
    const { isbn } = req.body;

    try {
        const book = await Book.findOne({ isbn });
        if (!book || book.available === 0) {
            return res.status(400).json({ error: 'Książka niedostępna' });
        }

        const existing = await Loan.findOne({
            user: req.user._id,
            book: book._id,
            status: { $in: ['reserved', 'loaned'] }
        });

        if (existing) {
            return res.status(409).json({ error: 'Książka już zarezerwowana przez użytkownika' });
        }

        const loan = new Loan({
            book: book._id,
            user: req.user._id,
            loan_date: new Date(),
            status: 'reserved',
            prolonged: false,
            penalty: 0
        });

        await loan.save();
        book.available--;
        await book.save();

        res.status(201).json(loan);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findOne({ _id: req.params._id }).populate('book');
        if (!loan) return res.status(404).json({ error: 'Nie znaleziono' });

        const roleName = req.user.role_name;
        console.log('req.user:', req.user);
        console.log('loan:', loan);
        if (loan.status === 'reserved' && roleName === 'User') {
            const book = await Book.findById(loan.book._id);
            book.available++;
            await book.save();
            await loan.deleteOne();
            return res.json({ message: 'Rezerwacja usunięta' });
        }

        res.status(403).json({ error: 'Brak uprawnień' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Błąd serwera' });

    }
};

exports.markLoaned = async (req, res) => {
    try {
        const loan = await Loan.findOne({ _id: req.params._id });
        if (!loan) return res.status(404).json({ error: 'Nie znaleziono' });

        const roleName = req.user.role_name;
        if (roleName === 'assistant') {
            loan.status = 'loaned';
            loan.return_date = dayjs().add(1, 'month').toDate();
            await loan.save();
            return res.json({ message: 'Książka oznaczona jako wypożyczona' });
        }

        res.status(403).json({ error: 'Brak uprawnień' });
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.markReturned = async (req, res) => {
    try {
        const loan = await Loan.findById({ _id: req.params._id }).populate('book');
        if (!loan) return res.status(404).json({ error: 'Nie znaleziono' });

        const roleName = req.user.role_name;
        if (roleName === 'assistant') {
            loan.status = 'returned';
            loan.return_date = new Date();
            await loan.save();
            const book = await Book.findById(loan.book._id);
            book.available++;
            await book.save();

            return res.json({ message: 'Książka zwrócona' });
        }

        res.status(403).json({ error: 'Brak uprawnień' });
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
        console.log(err);
    }
};

exports.prolongLoan = async (req, res) => {
    try {
        const loan = await Loan.findOne({ _id: req.params._id });
        if (!loan) return res.status(404).json({ error: 'Nie znaleziono' });

        if (loan.prolonged) {
            return res.status(400).json({ error: 'Można przedłużyć tylko raz' });
        }

        loan.return_date = dayjs(loan.return_date).add(1, 'month').toDate();
        loan.prolonged = true;
        await loan.save();

        res.json({ message: 'Przedłużono wypożyczenie o miesiąc' });
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });

    }
};

exports.calculatePenalties = async (req, res) => {
    try {
        const now = new Date();
        const overdueLoans = await Loan.find({
            status: 'loaned',
            return_date: { $lt: now }
        });

        for (const loan of overdueLoans) {
            const daysOverdue = dayjs(now).diff(dayjs(loan.return_date), 'day');
            loan.penalty = parseFloat((daysOverdue * 0.10).toFixed(2));
            await loan.save();
        }

        res.json({ message: 'Kary naliczone' });
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
};
