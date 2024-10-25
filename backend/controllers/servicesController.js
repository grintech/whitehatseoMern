const Services = require('../models/Service');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'frontend', 'public', 'serviceimg')); // Destination folder for uploaded images
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); // Unique filename for each uploaded file
  }
});

const upload = multer({ storage: storage });

// Controller functions

// Create a new Service item
const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file.filename; // Get the filename of the uploaded image
    const slug = slugify(title, { lower: true, strict: true }); // Generate the slug from the title

    const serviceItem = new Services({
      image,
      title,
      description,
      slug
    });

    const createdService = await serviceItem.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all service items
const getAllServices = async (req, res) => {
  try {
    const serviceItems = await Services.find();
    res.json(serviceItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a specific service item by ID
const getServiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const serviceItem = await Services.findById(id);

    if (!serviceItem) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(serviceItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getServiceBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const serviceItem = await Services.find({slug});

    if (!serviceItem) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(serviceItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// const getServiceBySlug = async (req, res) => {
//   const { slug } = req.params;

//   if (!slug || typeof slug !== 'string') {
//     return res.status(400).json({ message: 'Invalid slug parameter' });
//   }

//   try {
//     const serviceItem = await Services.findOne({ slug });

//     if (!serviceItem) {
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     res.json(serviceItem);
//   } catch (error) {
//     console.error('Error fetching service:', error); // Log error for debugging
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


// Update a service item by ID
const updateServiceById = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  let updateFields = { title, description };

  if (title) {
    updateFields.slug = slugify(title, { lower: true, strict: true });
  }

  if (req.file) {
    updateFields.image = req.file.filename; // Update image if a new one is uploaded
  }

  try {
    const updatedService = await Services.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service item by ID
const deleteServiceById = async (req, res) => {
  const id = req.params.id;

  try {
    const serviceItem = await Services.findById(id);

    if (!serviceItem) {
      return res.status(404).json({ message: 'Service item not found' });
    }

    // Construct the image path
    const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'serviceimg', serviceItem.image);

    // Delete the service entry
    await Services.findByIdAndDelete(id);

    // Delete the image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return res.status(500).json({ message: 'Failed to delete the image' });
      }

      res.json({ message: 'Service item and image deleted successfully' });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService, getAllServices, getServiceById, getServiceBySlug, updateServiceById, deleteServiceById, upload
};
