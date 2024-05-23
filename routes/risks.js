const express = require('express');
const router = express.Router();
const Risk = require('../models/risk');

// Create a new risk
router.post('/risks', async (req, res) => {
  try {
    const risk = new Risk(req.body);
    await risk.save();
    res.status(201).send(risk);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all risks
router.get('/risks', async (req, res) => {
  try {
    const risks = await Risk.find({});
    res.status(200).send(risks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific risk
router.get('/risks/:id', async (req, res) => {
  try {
    const risk = await Risk.findById(req.params.id);
    if (!risk) {
      return res.status(404).send();
    }
    res.status(200).send(risk);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a risk
router.patch('/risks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['projectType', 'riskDescription', 'riskCategory', 'likelihood', 'impact', 'status'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const risk = await Risk.findById(req.params.id);

    if (!risk) {
      return res.status(404).send();
    }

    updates.forEach((update) => risk[update] = req.body[update]);
    await risk.save();
    res.status(200).send(risk);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a risk
router.delete('/risks/:id', async (req, res) => {
  try {
    const risk = await Risk.findByIdAndDelete(req.params.id);

    if (!risk) {
      return res.status(404).send();
    }

    res.status(200).send(risk);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
