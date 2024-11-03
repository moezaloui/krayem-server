// controllers/propertyController.js
const Property = require('../models/Property');

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPropertyByCat = async (req, res) => {
  //console.log(req.params);
  try {
    const property = await Property.find({ type: req.params.type });
    if (!property) return res.status(404).json({ message: 'Property not found in this category' });
    if ((property.length = 0)){
      return res.status(400).json({ message: 'Property not found in this category' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new property
const createProperty = async (req, res) => {
  const property = new Property(req.body);

  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// edite proeritie
const editProperty = async (req, res) => {
  const propertyId = req.params.id;
  const updatedData = req.body;
  
  //console.log('updatedData.for:', updatedData.for);
  
  try {
    // Met à jour la propriété et retourne l'objet mis à jour
    const property = await Property.findByIdAndUpdate(propertyId, updatedData, { new: true });
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'An error occurred while updating the property' });
  }
};
// const editProperty = async (req, res) => {
//   const propertyId = req.params.id; 
//   const updatedData = req.body;
//   try {
//     const property = await Property.findById(propertyId);
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }

//     Object.assign(property, updatedData); 
    
//     await property.save();

//     res.status(200).json({ message: 'Property updated successfully', property });
//   } catch (error) {
//     console.error('Error updating property:', error);
//     res.status(500).json({ error: 'An error occurred while updating the property' });
//   }
// };
// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  getPropertyByCat,
  editProperty,
  deleteProperty,
};
