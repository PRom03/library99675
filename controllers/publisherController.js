
const Publisher = require('../models/Publisher');

exports.index = async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.json(publishers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.store = async (req, res) => {
    try {
        const {name,image_source } = req.body;
        const newPublisher= await Publisher.create({ name,image_source });
        res.status(201).json(newPublisher);
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
};

exports.show = async (req, res) => {
    try {
        const publisher = await Publisher.findOne({_id:req.params._id});
        if (!publisher) return res.status(404).json({ message: 'Wydawca nie znaleziony' });
        res.json(publisher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { name ,image_source} = req.body;

        const updated = await Publisher.findOneAndUpdate(
            {_id: req.params._id},
            { name,image_source },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Wydawca nie zaktualizowany' });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.destroy = async (req, res) => {
    try {
        const deleted = await Publisher.findOneAndDelete({ _id: req.params._id });
        if (!deleted) return res.status(404).json({ message: 'Wydawca nie znaleziony' });
        res.json({ message: 'Usunięto wydawcę', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
