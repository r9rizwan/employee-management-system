const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection');

const Designation = sequelize.define('Designation', {
    designationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'designations',
    timestamps: true,
});

module.exports = Designation;
