// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  editProperty,
  getPropertyByCat,
} = require('../controllers/propertyController');

// Define routes
router.get('/get-properties', getAllProperties); // GET all properties
router.get('/get-propertie/:id', getPropertyById); // GET a single property by ID
router.get('/get-properties-by-cat/:type', getPropertyByCat);
router.put('/edite-propertie/:id', editProperty);
router.post('/create-propertie', createProperty); // POST a new property
router.delete('/delete-propertie/:id', deleteProperty); // DELETE a property

module.exports = router;
