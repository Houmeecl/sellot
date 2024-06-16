const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { createCompany } = require('../controllers/companyController');

const router = express.Router();

router.post('/', protect, admin, createCompany);

module.exports = router;
