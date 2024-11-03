// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    thumbnails: [{ type: String }], // List of thumbnail image URLs
    title: { type: String, required: true },
    location: {
      country: { type: String, required: true },
      address: { type: String, required: true },
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    for: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['v','m', 't'], required: true }, // 'b' for buy, 't' for rent
    criteria: {
      piscine: { type: Number, default: 0 }, // Number of pools
      garage: { type: Number, default: 0 }, // Number of garages
      jardin: { type: Number, default: 0 }, // Number of gardens
      abri_voiture: { type: Number, default: 0 }, // Car shelters
      terrasse: { type: Number, default: 0 }, // Whether it has a terrace
      salon: { type: Number, default: 0 }, // Whether it has a living room
      cuisine: { type: Number, default: 0 }, // Whether it has a kitchen
      salle_a_manger: { type: Number, default: 0 }, // Dining room
      chambres: { type: Number, default: 0 }, // Number of bedrooms
      salle_de_bain: { type: Number, default: 0 }, // Number of bathrooms
      salle_d_eau: { type: Number, default: 0 }, // Number of water rooms
      climatiseur: { type: Number, default: 0 }, // Air conditioning presence
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
