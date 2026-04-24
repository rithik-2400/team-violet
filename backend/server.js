const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const memberRoutes = require('./routes/memberRoutes');

// Load environment variables from .env (local development)
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/teamviolet';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/members', memberRoutes);
app.use('/api/members', memberRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Team Violet API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
