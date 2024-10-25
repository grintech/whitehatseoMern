const Blog = require('../models/SingleBlog');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'frontend', 'public', 'singleblogimg'));
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Create a new blog item
const createBlog = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const images = req.files.map(file => file.filename);

    const blogItem = new Blog({
      heading,
      description,
      images,
      slug: slugify(heading, { lower: true, strict: true })
    });

    const createdBlog = await blogItem.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog by slug
const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blog.findOne({ slug }); // Assuming `slug` is a field in your Blog model
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update blog by ID
const updateBlogById = async (req, res) => {
  const { id } = req.params;
  const { heading, description, removedImages } = req.body;

  try {
    const blogDetails = await Blog.findById(id);
    if (!blogDetails) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Get existing images from the blog
    let oldImages = blogDetails.images || [];

    // Parse the removedImages array (since it might come as a string from the request)
    const removedImagesArray = removedImages ? JSON.parse(removedImages) : [];

    // Remove the specified images from the filesystem
    removedImagesArray.forEach((image) => {
      const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'singleblogimg', image);
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


    // Update the blog with new data
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        heading,
        description,
        images: updatedImages, // Update the image list
        slug: newSlug, // Update the slug
      },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(400).json({ message: error.message });
  }
};

 

// Delete blog by ID
const deleteBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete images from the file system
    blog.images.forEach(image => {
      const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'singleblogimg', image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        }
      });
    });

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlogById,
  deleteBlogById,
  upload
};
