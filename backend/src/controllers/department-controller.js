const Department = require('../models/department');

exports.addDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Department name is required' });
        }

        const department = await Department.create({ name });
        res.status(201).json(department);
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ error: 'An error occurred while adding the department.' });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json(departments);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ error: 'An error occurred while fetching departments.' });
    }
};
