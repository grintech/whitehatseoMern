// controllers/teamController.js

const Team = require('../models/Team');
const multer = require('multer');

// require to deleted images as weell
const fs = require('fs');
const path = require('path');

// ----------------------

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/teamimg/'); // Destination folder for uploaded images
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename for each uploaded file
    }
});

const upload = multer({ storage: storage });

// Controller functions

// Create a new team member
const createTeam = async (req, res) => {
    try {
        const { title, description, role, link1, link2, link3, link4 } = req.body;
        const image = req.file.filename; // Get the filename of the uploaded image

        const TeamMember = new Team({
            image,
            title,
            role,
            description,
            link1,
            link2,
            link3,
            link4
        });

        const createdTeam = await TeamMember.save();
        res.status(201).json(createdTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all team members
const getAllTeam = async (req, res) => {
    try {
        const getTeam = await Team.find();
        res.json(getTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific team member by ID
const getMemberById = async (req, res) => {
    const id = req.params.id;

    try {
        const getMember = await Team.findById(id);

        if (!getMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        res.json(getMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a team member by ID
const updateMemberById = async (req, res) => {
    const { id } = req.params;
    const { title, description, role, link1, link2, link3, link4 } = req.body;
    let updateFields = { title, description, role, link1, link2, link3, link4 };

    try {
        const teamMember = await Team.findById(id);

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        if (req.file) {
            // Delete the old image if a new one is uploaded
            const oldImagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'teamimg', teamMember.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image:', err);
                }
            });

            updateFields.image = req.file.filename; // Update image if a new one is uploaded
        }

        const updatedTeamMember = await Team.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedTeamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        res.json(updatedTeamMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete a team member by ID
const deleteMemberById = async (req, res) => {
    const id = req.params.id;

    try {
        const teamMember = await Team.findById(id);

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Construct the image path
        const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'teamimg', teamMember.image);

        // Delete the team member entry
        await Team.findByIdAndDelete(id);

        // Delete the image file
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
                return res.status(500).json({ message: 'Failed to delete the image' });
            }

            res.json({ message: 'Team member and image deleted successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTeam, getAllTeam, getMemberById, updateMemberById, deleteMemberById, upload
};
