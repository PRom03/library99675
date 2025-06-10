
const Category = require('../models/Category');

exports.index = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.store = async (req, res) => {
    try {
        const {name } = req.body;
        const newCategory= await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.show = async (req, res) => {
    try {
        const category = await Category.findOne({_id:req.params._id});
        if (!category) return res.status(404).json({ message: 'Autor nie znaleziony' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { name } = req.body;

        const updated = await Category.findOneAndUpdate(
            {_id:req.params._id},
            { name },
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
        const deleted = await Category.findOneAndDelete({ _id: req.params._id });
        if (!deleted) return res.status(404).json({ message: 'Książka nie znaleziona' });
        res.json({ message: 'Usunięto książkę', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
