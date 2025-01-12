const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection');
const Employee = require('../models/employee');
const Department = require('../models/department');
const Designation = require('../models/designation');

const generateUniqueId = async () => {
    let unique = false;
    let employeeId;

    while (!unique) {
        // Generate a 6-digit random ID
        employeeId = Math.floor(100000 + Math.random() * 900000).toString();

        // Check if it already exists
        const existingEmployee = await Employee.findOne({ where: { employeeId } });
        if (!existingEmployee) {
            unique = true;
        } else {
            console.log(`Duplicate ID found: ${employeeId}, regenerating...`);
        }
    }

    console.log("Generated unique employeeId:", employeeId); // Log the generated ID
    return employeeId;
};
exports.addEmployee = async (req, res) => {
    try {
        const { firstName, lastName, departmentId, phoneNumber, designationId, nationalInsuranceNumber, address } = req.body;
        if (!firstName || !lastName || !departmentId || !phoneNumber || !designationId || !nationalInsuranceNumber || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const employeeId = await generateUniqueId();
        const employee = await Employee.create({ employeeId, firstName, lastName, departmentId, phoneNumber, designationId, nationalInsuranceNumber, address });
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'An error occurred while adding the employee.' });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: [
                { model: Department, as: 'Department' },
                { model: Designation, as: 'Designation' }
            ],
            attributes: {
                include: [
                    [sequelize.literal('`Department`.`name`'), 'department'],
                    [sequelize.literal('`Designation`.`title`'), 'designation']
                ]
            }
        });
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'An error occurred while fetching employees.' });
    }
};
exports.getEmployeesByDepartment = async (req, res) => {
    const { department } = req.params;
    try {
        const employees = await Employee.findAll({ where: { department } });
        if (employees.length === 0) {
            return res.status(404).json({ message: `No employees found in the ${department} department` });
        }
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees by department:", error);
        res.status(500).json({ error: 'An error occurred while fetching employees by department.' });
    }
};

// exports.getEmployeeById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const employee = await Employee.findByPk(id);
//         if (!employee) {
//             return res.status(404).json({ message: `Employee with ID ${id} not found` });
//         }
//         res.status(200).json(employee);
//     } catch (error) {
//         console.error("Error fetching employee by ID:", error);
//         res.status(500).json({ error: 'An error occurred while fetching the employee.' });
//     }
// };

exports.updateEmployee = async (req, res) => {
    const { employeeId } = req.params;
    try {
        // Update employee data
        const [updated] = await Employee.update(req.body, { where: { employeeId } });

        // Check if the employee was updated
        if (!updated) {
            return res.status(404).json({ message: `Employee with ID ${employeeId} not found or no changes were made` });
        }

        // Retrieve the updated employee data
        const updatedEmployee = await Employee.findByPk(employeeId);
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: 'An error occurred while updating the employee.' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;

        // Use Sequelize to delete the record
        const result = await Employee.destroy({
            where: { employeeId },
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.getEmployeeById = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await Employee.findOne({
            where: { employeeId },
            include: [
                { model: Department, as: 'Department' },
                { model: Designation, as: 'Designation' }
            ]
        });
        if (!employee) {
            return res.status(404).json({ message: `Employee with ID ${employeeId} not found` });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        res.status(500).json({ error: 'An error occurred while fetching the employee.' });
    }
};