// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const ROUTES = [
  "/api/properties/delete-property/:id",
  "/api/properties/create-property",
  "/api/properties/edit-property/:id",
  "/api/properties/get-property/:id",
  "/api/properties/get-properties",
  "/auth/user/edit-password/:id",
  "/auth/user/edit-informations/:id",
  "/auth/user/get-info",
  "/auth/user/login",
  "/auth/user/register"
];

// Import and use property routes
const propertyRoutes = require('./routes/propertyRoutes');
const authAccesRoutes = require('./routes/authRoutes');
app.use('/api/properties', propertyRoutes);
app.use('/auth/user', authAccesRoutes);

// Route to display available routes
app.use('/dev/routes', (req, res) => {
  const routesFormatted = ROUTES.map(route => `- ${route}`).join('\n');
  res.send(`Hello, server running on port ${PORT} ✔\nAvailable Routes:\n${routesFormatted}`);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
