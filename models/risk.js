const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  projectType: {
    type: String,
    required: true
  },
  riskDescription: {
    type: String,
    required: true
  },
  riskCategory: {
    type: String,
    required: true
  },
  likelihood: {
    type: Number,
    required: true
  },
  impact: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['identified', 'mitigated', 'realized'],
    default: 'identified'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Risk = mongoose.model('Risk', riskSchema);

module.exports = Risk;
