const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createEvaluation, getEvaluations } = require('../controllers/evaluationController');

const router = express.Router();

router.post('/', protect, createEvaluation);
router.get('/', protect, getEvaluations);

module.exports = router;
