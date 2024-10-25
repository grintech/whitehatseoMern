// controllers/newsController.js
const AboutUs = require('../models/AboutUs');
const multer = require('multer');

// require to deleted images as well

const fs = require('fs');
const path = require('path');

// ---------------------------------

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/aboutUs/'); // Destination folder for uploaded images
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename for each uploaded file
    }
});

const upload = multer({ storage: storage });

// Controller functions


// Create new about us entry
const createAboutUs = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file.filename; // Get the filename of the uploaded image

    const newsItem = new AboutUs({
        image,
        title,
        description
    });

    const createdNews = await newsItem.save();
    res.status(201).json(createdNews);
} catch (error) {
    res.status(400).json({ message: error.message });
}
  };
  
  // Get all about us entries
  const getAllAboutUs = async (req, res) => {
    try {
      const aboutUsEntries = await AboutUs.find();
      res.json(aboutUsEntries);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get all about us by Id

  const getAllAboutById = async (req, res) => {
    const id = req.params.id;
    try {
        const aboutItem = await AboutUs.findById(id);

        if (!aboutItem) {
            return res.status(404).json({ message: 'News item not found' });
        }

        res.json(aboutItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
  
  // Update an existing about us entry
//   const updateAboutUs = async (req, res) => {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     let updateFields = { title, description };

//      if (req.file) {
//         updateFields.image = req.file.filename; // Update image if a new one is uploaded
//      }

//     try {
//         const updatedNews = await AboutUs.findByIdAndUpdate(id, updateFields, { new: true });

//         if (!updatedNews) {
//             return res.status(404).json({ message: 'About details not found' });
//         }

//         res.json(updatedNews);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
//   };

// Update About Us by ID

    const updateAboutUs = async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        let updateFields = { title, description };

        try {
            const aboutUsDetails = await AboutUs.findById(id);

            if (!aboutUsDetails) {
                return res.status(404).json({ message: 'About details not found' });
            }

            if (req.file) {
                // Delete the old image if a new one is uploaded
                const oldImagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'aboutUs', aboutUsDetails.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    }
                });

                updateFields.image = req.file.filename; // Update image if a new one is uploaded
            }

            const updatedAboutUs = await AboutUs.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedAboutUs) {
                return res.status(404).json({ message: 'About details not found' });
            }

            res.json(updatedAboutUs);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

  
  // Delete an about us entry
  // const deleteAboutUs = async (req, res) => {
  //   try {
  //     await AboutUs.findByIdAndDelete(req.params.id);
  //     res.json({ message: 'Deleted about us entry' });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // }

  const deleteAboutUs = async (req, res) => {
    const id = req.params.id;
    try {
        const aboutUs = await AboutUs.findById(id);
        if (!aboutUs) {
            return res.status(404).json({ message: 'Data not found' });
        }
        // Construct the image path
        const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'aboutUs', aboutUs.image);

        // Delete the blog entry
        await AboutUs.findByIdAndDelete(id);

        // Delete the image file
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
                return res.status(500).json({ message: 'Failed to delete the image' });
            }

            res.json({ message: 'About us and image deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createAboutUs, getAllAboutUs, getAllAboutById, updateAboutUs, deleteAboutUs, upload
};
