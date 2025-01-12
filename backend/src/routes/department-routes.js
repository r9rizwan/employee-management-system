const express = require('express');
const { addDepartment, getAllDepartments } = require('../controllers/department-controller');
const router = express.Router();

router.post('/', addDepartment);
router.get('/', getAllDepartments);

module.exports = router;
