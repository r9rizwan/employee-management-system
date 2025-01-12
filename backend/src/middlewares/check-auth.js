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
        // Decode the token and extract user details
        const payload = jwt.verify(token, JWT_TOKEN);

        // Find user based on the ID in the token (could be any identifier)
        const user = await User.findOne({ where: { id: payload.id } });
        if (!user || !user.active) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Attach user information to the request
        req.user = {
            id: payload.id,
            userId: payload.userId,
            firstName: payload.firstName,  // Include firstName from the token payload
            lastName: payload.lastName,    // Include lastName from the token payload
            role: payload.role             // Optional: Include role from the token payload
        };

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

module.exports = { checkAuth };
