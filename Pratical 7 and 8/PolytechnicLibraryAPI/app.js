// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// Middleware
const verifyJWT = require('./middleware/verifyJWT');

// Routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Middleware setup
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes); // /register, /login
app.use('/api/books', verifyJWT, bookRoutes); // protected book routes

// Home
app.get('/', (req, res) => {
  res.send('Welcome to Polytechnic Library API');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
