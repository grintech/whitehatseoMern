// controllers/testimonialController.js

const Testimonial = require('../models/Testimonial');
const multer = require('multer');

// require to deleted images as well
const fs = require('fs');
const path = require('path');

// ----------------------

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/testimg/'); // Destination folder for uploaded images
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename for each uploaded file
    }
});

const upload = multer({ storage: storage });


// Create a new testimonial
const createTeam = async (req, res) => {
    try {
        const { title, description, role } = req.body;
        const image = req.file.filename; // Get the filename of the uploaded image

        const TeamMember = new Testimonial({
            image,
            title,
            role,
            description
        });

        const createdTeam = await TeamMember.save();
        res.status(201).json(createdTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all testimonials
const getAllTeam = async (req, res) => {
    try {
        const getTeam = await Testimonial.find();
        res.json(getTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific testimonial by ID
const getMemberById = async (req, res) => {
    const id = req.params.id;

    try {
        const getMember = await Testimonial.findById(id);

        if (!getMember) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.json(getMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a testimonial by ID

const updateMemberById = async (req, res) => {
    const { id } = req.params;
    const { title, description ,role } = req.body;
    let updateFields = { title, description, role };

    if (req.file) {
        updateFields.image = req.file.filename; // Update image if a new one is uploaded
    }

    try {
        const updatedTeamMember = await Testimonial.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedTeamMember) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.json(updatedTeamMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a testimonial by ID

const deleteMemberById = async (req, res) => {
    const id = req.params.id;

    try {
        const teamMember = await Testimonial.findById(id);

        if (!teamMember) {
            return res.status(404).json({ message: ' Testimonial not found' });
        }

        // Construct the image path
        const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'testimg', teamMember.image);

        // Delete the team member entry
        await Testimonial.findByIdAndDelete(id);

        // Delete the image file

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
                return res.status(500).json({ message: 'Failed to delete the image' });
            }

            res.json({ message: 'Testimonial and image deleted successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createTeam, getAllTeam, getMemberById, updateMemberById, deleteMemberById, upload
};
