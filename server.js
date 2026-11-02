require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const subscriberRoutes = require('./routes/subscribers');

const app = express();

// Parse JSON bodies (Postman sends JSON)
app.use(express.json());

// Health check — proves the server is up without touching the DB
app.get('/', (req, res) => {
  res.json({ message: 'Backend Tutorial API is running. Use /subscribers for CRUD.' });
});

// All subscriber CRUD routes live under /subscribers
app.use('/subscribers', subscriberRoutes);

// Connect to MongoDB, then start listening.
// DATABASE_URL comes from .env (your MongoDB Atlas cluster URI).
// If it is missing, the server still starts so you can see the error clearly.
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

async function start() {
  if (!DATABASE_URL) {
    console.error('DATABASE_URL is not set. Copy .env.example to .env and paste your MongoDB Atlas URI.');
  } else {
    try {
      await mongoose.connect(DATABASE_URL);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection failed:', err.message);
    }
  }
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start();
