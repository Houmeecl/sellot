require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const syncRoutes = require('./routes/syncRoutes');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/sync', syncRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
