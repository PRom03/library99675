const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
require('dotenv').config();
// Uwierzytelnienie użytkownika i dołączenie roli
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Brak tokenu uwierzytelniającego' });
        }

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET); // dodaj JWT_SECRET do .env

        const user = await User.findOne({_id:payload.id}).populate('role');
        if (!user) return res.status(401).json({ error: 'Nieprawidłowy użytkownik' });

        // Dodaj dane do req.user
        req.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role_name: user.role?.role_name || 'User' // zakładamy pole name w modelu roli
        };

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Nieautoryzowany' });
    }
};

// Autoryzacja ról
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role_name)) {
            return res.status(403).json({ error: 'Brak uprawnień' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
