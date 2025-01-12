const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection');
const Department = require('./department');
const Designation = require('./designation');

const Employee = sequelize.define('Employee', {
    employeeId: {
        type: DataTypes.STRING(6),
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: 'departmentId',
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    designationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Designation,
            key: 'designationId',
        },
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

// Define the relationship between models
Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Employee.belongsTo(Designation, { foreignKey: 'designationId' });

module.exports = Employee;
