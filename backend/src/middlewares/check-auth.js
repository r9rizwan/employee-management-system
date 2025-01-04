// middleware/checkAuth.js
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = process.env;
const User = require("../models/user");

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, JWT_TOKEN);
        const user = await User.findOne({ where: { id: payload.id } });
        if (!user || !user.active) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        req.user = { id: payload.id, userId: payload.userId, role: payload.role };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

module.exports = { checkAuth };
