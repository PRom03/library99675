const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const Publisher = require('../models/Publisher');

exports.search = async (req, res) => {
    try {
        const query = req.query.q || '';

        const regex = new RegExp(query, 'i');

        const [authors, categories, publishers] = await Promise.all([
            Author.find({
                $or: [
                    { first_name: { $regex: regex } },
                    { last_name: { $regex: regex } }
                ]
            }),
            Category.find({ name: { $regex: regex } }),
            Publisher.find({ name: { $regex: regex } }),
        ]);

        const authorIds = authors.map(a => a._id);
        const categoryIds = categories.map(c => c._id);
        const publisherIds = publishers.map(p => p._id);

        const books = await Book.find({
            $or: [
                { title: { $regex: regex } },
                { author: { $in: authorIds } },
                { category: { $in: categoryIds } },
                { publisher: { $in: publisherIds } },
            ]
        }).populate('author').populate('category').populate('publisher');

        res.json({ books,authors,categories, publishers });
    } catch (err) {
        console.error('Błąd podczas wyszukiwania:', err);
        res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
    }
};
