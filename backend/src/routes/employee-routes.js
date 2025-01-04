const express = require('express');
const { addEmployee, getAllEmployees, getEmployeesByDepartment, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employee-controller');
const router = express.Router();

router.post('/', addEmployee);
router.get('/', getAllEmployees);
router.get('/department/:department', getEmployeesByDepartment);
router.put('/:employeeId', updateEmployee);
router.delete('/:employeeId', deleteEmployee);
router.get('/:employeeId', getEmployeeById);

module.exports = router;
