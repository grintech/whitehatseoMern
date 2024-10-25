// controllers/contactController.js

const Contact = require('../models/Contact');

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, subject, message } = req.body;
    
    // Check if the email already exists
    const existingEmail = await Contact.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    // Check if the phone already exists
    const existingPhone = await Contact.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ success: false, error: 'Phone number already exists' });
    }

    const newContact = new Contact({ firstName, lastName, phone, email, subject, message });
    await newContact.save();
    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, subject, message } = req.body;

    // Check if the email already exists and is not the current contact
    const existingEmail = await Contact.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== req.params.id) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    // Check if the phone already exists and is not the current contact
    const existingPhone = await Contact.findOne({ phone });
    if (existingPhone && existingPhone._id.toString() !== req.params.id) {
      return res.status(400).json({ success: false, error: 'Phone number already exists' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      phone,
      email,
      subject,
      message
    }, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: deletedContact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {createContact, getAllContacts, getContactById, updateContact, deleteContact}
