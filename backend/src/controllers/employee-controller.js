const Employee = require('../models/employee');

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
        const { firstName, lastName, department, phoneNumber, designation, nationalInsuranceNumber, address } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !department || !phoneNumber || !designation || !nationalInsuranceNumber || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Generate unique employeeId before creating the employee
        const employeeId = await generateUniqueId();

        // Create the employee in the database and save the employeeId
        const employee = await Employee.create({
            ...req.body, // Spread the rest of the fields from the request body
            employeeId,   // Add the generated employeeId here
        });

        console.log("Generated employeeId:", employeeId);
        console.log("Created Employee:", employee);

        // Respond with the employeeId and other relevant data (not just the auto-generated id)
        res.status(201).json({
            employeeId: employee.employeeId,  // Explicitly return the employeeId
            firstName: employee.firstName,
            lastName: employee.lastName,
            department: employee.department,
            phoneNumber: employee.phoneNumber,
            designation: employee.designation,
            nationalInsuranceNumber: employee.nationalInsuranceNumber,
            address: employee.address,
            // Add any other fields you want to return
        });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ error: 'An error occurred while adding the employee.' });
    }
};
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
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
    const { id } = req.params;
    try {
        const deleted = await Employee.destroy({ where: { id } });

        // Check if the employee was deleted
        if (!deleted) {
            return res.status(404).json({ message: `Employee with ID ${id} not found` });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: 'An error occurred while deleting the employee.' });
    }
};

exports.getEmployeeById = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await Employee.findOne({ where: { employeeId } });
        if (!employee) {
            return res.status(404).json({ message: `Employee with ID ${employeeId} not found` });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        res.status(500).json({ error: 'An error occurred while fetching the employee.' });
    }
};