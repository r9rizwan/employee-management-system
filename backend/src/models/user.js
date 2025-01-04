// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user', // Can be 'admin', 'user', etc.
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Set false if user is inactive
    },
}, {
    tableName: 'users',
    timestamps: false,
});

// Hash password before saving user
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

// Method to compare hashed password
User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;
