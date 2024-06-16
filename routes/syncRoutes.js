const express = require('express');
const { syncCompanyData, syncEvaluations } = require('../controllers/syncController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/company/:companyId', protect, admin, syncCompanyData);
router.get('/evaluations/:companyId', protect, admin, syncEvaluations);

module.exports = router;
