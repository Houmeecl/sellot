const Evaluation = require('../models/Evaluation');

const createEvaluation = async (req, res) => {
  const { company, score, details } = req.body;
  try {
    const evaluation = await Evaluation.create({ company, score, details });
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(400).json({ message: 'Evaluation creation failed', error });
  }
};

const getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.json(evaluations);
  } catch (error) {
    res.status(400).json({ message: 'Fetching evaluations failed', error });
  }
};

module.exports = { createEvaluation, getEvaluations };
