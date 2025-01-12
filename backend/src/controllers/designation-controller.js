const Designation = require('../models/designation');

exports.addDesignation = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Designation title is required' });
        }

        const designation = await Designation.create({ title });
        res.status(201).json(designation);
    } catch (error) {
        console.error("Error adding designation:", error);
        res.status(500).json({ error: 'An error occurred while adding the designation.' });
    }
};

exports.getAllDesignations = async (req, res) => {
    try {
        const designations = await Designation.findAll();
        res.status(200).json(designations);
    } catch (error) {
        console.error("Error fetching designations:", error);
        res.status(500).json({ error: 'An error occurred while fetching designations.' });
    }
};
