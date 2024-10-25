// models/contactModel.js

const mongoose = require('mongoose');

// Contact Schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date,default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
