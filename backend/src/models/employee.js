const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection');

const Employee = sequelize.define('Employee', {
    employeeId: {
        type: DataTypes.STRING(6),
        unique: true,
        allowNull: false,
        primaryKey: true,  // Add this line to make employeeId the primary key
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationalInsuranceNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'employees',
    timestamps: true,
});

module.exports = Employee;
