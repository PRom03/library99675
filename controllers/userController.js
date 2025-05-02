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
        const adminRole = await Role.findOne({ role_name: 'Admin' });
        const newUser= await User.create({ name,email,password,created_at,role:adminRole._id });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Nieprawidłowy e-mail lub hasło" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Nieprawidłowy e-mail lub hasło" });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });

        res.status(200).json({ message: "Zalogowano", token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: "Błąd podczas wylogowywania" });
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Wylogowano" });
    });
};