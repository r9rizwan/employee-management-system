const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection');

const Department = sequelize.define('Department', {
    departmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'departments',
    timestamps: true,
});

module.exports = Department;
