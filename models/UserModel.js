// models/Property.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    picture: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    pwd: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);