const express = require('express');
const mongoose = require('mongoose');
const riskRouter = require('./routes/risk'); // Import risk routes
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use the risk routes
app.use(riskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
