const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON requests
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/planner', require('./routes/plannerRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes')); // Add new dashboard routes

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
