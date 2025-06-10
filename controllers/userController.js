const User = require("../models/User");
const Role = require("../models/Role");
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "tajny_klucz"; // W .env ustaw silny klucz
exports.register = async (req, res) => {
    try {
        let {name,email,password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Użytkownik z tym e-mailem już istnieje." });
        }
        password=await bcrypt.hash(password,10);
        const created_at=Date.now();
        const userRole = await Role.findOne({ role_name: 'User' });
        const newUser= await User.create({ name,email,password,created_at,role:userRole._id });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            return res.status(401).json({ error: "Nieprawidłowy e-mail lub hasło" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Nieprawidłowy e-mail lub hasło" });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, role: user.role?.role_name },
            JWT_SECRET,
            { expiresIn: "1h" }
        );


        res.status(200).json({ message: "Zalogowano", token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getMe = async (req, res) => {
    try {
        const me = await User.findOne({_id: req.user._id});
        res.status(200).json(me);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
};

exports.editMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const { name, email, oldPassword, newPassword } = req.body;

        if (!user) {
            return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
        }

        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Stare hasło jest nieprawidłowe' });
            }

            const hashed = await bcrypt.hash(newPassword, 10);
            user.password = hashed;
        }

        if (name) user.name = name;
        if (email) user.email = email;

        user.updated_at = new Date();

        await user.save();

        const { password, ...userData } = user.toObject();

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
