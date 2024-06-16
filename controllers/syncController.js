const axios = require('axios');
const Company = require('../models/Company');
const Evaluation = require('../models/Evaluation');

const apiClient = axios.create({
  baseURL: 'https://api.cymasuite.com/',
  headers: {
    'Content-Type': 'application/json',
    'API-KEY': process.env.API_KEY,
  },
});

const syncCompanyData = async (req, res) => {
  const { companyId } = req.params;

  try {
    const response = await apiClient.get(`/api/v1/company/${companyId}`);
    const companyData = response.data;

    const company = new Company({
      name: companyData.name,
      rut: companyData.rut,
    });
    await company.save();

    res.status(200).json({ message: 'Company data synced', company });
  } catch (error) {
    console.error('Error syncing company data:', error);
    res.status(500).json({ message: 'Error syncing company data' });
  }
};

const syncEvaluations = async (req, res) => {
  const { companyId } = req.params;

  try {
    const response = await apiClient.get('/api/v1/documents', {
      params: { company_id: companyId },
    });

    const documents = response.data;

    for (const doc of documents) {
      const evaluation = new Evaluation({
        company: companyId,
        score: calculateScore(doc),
        details: doc.details,
      });
      await evaluation.save();
    }

    res.status(200).json({ message: 'Evaluations synced' });
  } catch (error) {
    console.error('Error syncing evaluations:', error);
    res.status(500).json({ message: 'Error syncing evaluations' });
  }
};

const calculateScore = (doc) => {
  let score = 0;
  if (doc.someCriterion) {
    score += 10;
  }
  return score;
};

module.exports = { syncCompanyData, syncEvaluations };
