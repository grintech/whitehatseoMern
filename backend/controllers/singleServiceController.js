const Service = require('../models/SingleService');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'frontend', 'public', 'singleserviceimg'));
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Create a new service item
const createService = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const images = req.files.map(file => file.filename);

    const serviceItem = new Service({
      heading,
      description,
      images,
      slug: slugify(heading, { lower: true, strict: true })
    });

    const createdService = await serviceItem.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all single services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single service by ID
const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single service by slug
const getServiceBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const service = await Service.findOne({ slug }); // Assuming `slug` is a field in your Service model
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update service by ID
const updateServiceById = async (req, res) => {
  const { id } = req.params;
  const { heading, description, removedImages } = req.body;

  try {
    const serviceDetails = await Service.findById(id);
    if (!serviceDetails) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Get existing images from the Service
    let oldImages = serviceDetails.images || [];

    // Parse the removedImages array (since it might come as a string from the request)
    const removedImagesArray = removedImages ? JSON.parse(removedImages) : [];

    // Remove the specified images from the filesystem
    removedImagesArray.forEach((image) => {
      const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'singleserviceimg', image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting image ${image}:`, err);
        }
      });
    });

    // Filter out removed images from the oldImages array
    oldImages = oldImages.filter((image) => !removedImagesArray.includes(image));

    // If new images are uploaded, add them to the old images
    const newImages = req.files ? req.files.map((file) => file.filename) : [];
    const updatedImages = [...oldImages, ...newImages];

    // Generate a new slug based on the updated heading
    const newSlug = slugify(heading, { lower: true, strict: true });


    // Update the Service with new data
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        heading,
        description,
        images: updatedImages, // Update the image list
        slug: newSlug, // Update the slug
      },
      { new: true }
    );

    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(400).json({ message: error.message });
  }
};

 

// Delete service by ID
const deleteServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Delete images from the file system
    service.images.forEach(image => {
      const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'singleserviceimg', image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        }
      });
    });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  getServiceBySlug,
  updateServiceById,
  deleteServiceById,
  upload
};
