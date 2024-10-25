// controllers/newsController.js

const News = require('../models/News');
const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/homeimages/'); // Destination folder for uploaded images
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename for each uploaded file
    }
});

const upload = multer({ storage: storage });

// Controller functions



// Create a new news item
const createNews = async (req, res) => {
    try {
        const { heading, description } = req.body;
        const image = req.file.filename; // Get the filename of the uploaded image

        const newsItem = new News({
            image,
            heading,
            description
        });

        const createdNews = await newsItem.save();
        res.status(201).json(createdNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all news items
const getAllNews = async (req, res) => {
    try {
        const newsItems = await News.find();
        res.json(newsItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific news item by ID
const getNewsById = async (req, res) => {
    const id = req.params.id;

    try {
        const newsItem = await News.findById(id);

        if (!newsItem) {
            return res.status(404).json({ message: 'News item not found' });
        }

        res.json(newsItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a news item by ID
const updateNewsById = async (req, res) => {
    const { id } = req.params;
    const { heading, description } = req.body;
    let updateFields = { heading, description };

    if (req.file) {
        updateFields.image = req.file.filename; // Update image if a new one is uploaded
    }

    try {
        const updatedNews = await News.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedNews) {
            return res.status(404).json({ message: 'News item not found' });
        }

        res.json(updatedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a news item by ID
const deleteNewsById = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedNews = await News.findByIdAndDelete(id);

        if (!deletedNews) {
            return res.status(404).json({ message: 'News item not found' });
        }

        res.json({ message: 'News item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNewsById,
    deleteNewsById,
    upload
};
