const express = require('express');
const { addDesignation, getAllDesignations } = require('../controllers/designation-controller');
const router = express.Router();

router.post('/', addDesignation);
router.get('/', getAllDesignations);

module.exports = router;
