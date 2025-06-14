
const Author = require('../models/Author');

exports.index = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.store = async (req, res) => {
    try {
        const {first_name,last_name, birthyear,image_source,brief_bio } = req.body;
        const newAuthor= await Author.create({ first_name,last_name, birthyear,image_source,brief_bio });
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.show = async (req, res) => {
    try {
        const author = await Author.findOne({_id:req.params._id});
        if (!author) return res.status(404).json({ message: 'Autor nie znaleziony' });
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { first_name,last_name, birthyear,image_source,brief_bio } = req.body;

        const updated = await Author.findOneAndUpdate(
            {_id: req.params._id},
            { first_name,last_name, birthyear,image_source,brief_bio },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Autor nie zaktualizowany' });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.destroy = async (req, res) => {
    try {
        const deleted = await Author.findOneAndDelete({ _id: req.params._id });
        if (!deleted) return res.status(404).json({ message: 'Autor nie znaleziony' });
        res.json({ message: 'Usunięto autora', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
