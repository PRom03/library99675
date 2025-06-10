const Loan = require('../models/loan');
const Book = require('../models/book');
const {populate} = require("dotenv");
exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;

        const userLoans = await Loan.find({ user: userId }).populate('book');

        const loanedBooks = userLoans.map(l => l.book).filter(Boolean);

        const loanedBookIds = loanedBooks.map(book => book._id.toString());

        // Zbieramy wszystkie kategorie z wypożyczonych książek (jeśli to tablica)
        const loanedCategoryIds = new Set();
        loanedBooks.forEach(book => {
            if (Array.isArray(book.category)) {
                book.category.forEach(cat => loanedCategoryIds.add(cat.toString()));
            } else if (book.category) {
                loanedCategoryIds.add(book.category.toString());
            }
        });

        const recommendedBooks = await Book.find({
            category: { $in: [...loanedCategoryIds] },
            _id: { $nin: loanedBookIds }
        })
            .populate('author')
            .populate('publisher')
            .populate('category');

        res.json(recommendedBooks); // teraz zwraca tablicę, nie obiekt!
        //console.log(recommendedBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Błąd podczas pobierania rekomendacji' });
    }
};
