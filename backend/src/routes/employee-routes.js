const express = require('express');
const { addEmployee, getAllEmployees, getEmployeesByDepartment, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employee-controller');
const { addDepartment, getAllDepartments } = require('../controllers/department-controller');
const { addDesignation, getAllDesignations } = require('../controllers/designation-controller');
const router = express.Router();

router.post('/', addEmployee);
router.get('/', getAllEmployees);
router.get('/department/:department', getEmployeesByDepartment);
router.put('/:employeeId', updateEmployee);
router.delete('/:employeeId', deleteEmployee);
router.get('/:employeeId', getEmployeeById);
router.post('/', addDepartment);
router.get('/', getAllDepartments);
router.post('/', addDesignation);
router.get('/', getAllDesignations);

module.exports = router;
