const Company = require('../models/Company');

const createCompany = async (req, res) => {
  const { name, rut } = req.body;
  try {
    const company = await Company.create({ name, rut });
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: 'Company creation failed', error });
  }
};

module.exports = { createCompany };
