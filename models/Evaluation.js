const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  score: { type: Number, required: true },
  details: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
