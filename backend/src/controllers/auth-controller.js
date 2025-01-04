const User = require('../models/user');

exports.login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.findOne({ where: { userId, password } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
