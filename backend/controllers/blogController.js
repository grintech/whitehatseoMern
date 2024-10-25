const Blog = require('../models/Blog');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'frontend', 'public', 'blogimg')); // Destination folder for uploaded images
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); // Unique filename for each uploaded file
  }
});

const upload = multer({ storage: storage });

// Create a new blog item
const createBlog = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const image = req.file.filename; // Get the filename of the uploaded image
    const slug = slugify(heading, { lower: true, strict: true }); // Generate the slug from the heading

    const blogItem = new Blog({
      image,
      heading,
      description,
      slug
    });

    const createdBlog = await blogItem.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all blog items
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.json(allBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific blog by ID
const getBlogById = async (req, res) => {
  const id = req.params.id;

  try {
    const blogData = await Blog.findById(id);

    if (!blogData) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blogData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog item by ID
const updateBlogById = async (req, res) => {
  const { id } = req.params;
  const { heading, description } = req.body;
  let updateFields = { heading, description };

  if (heading) {
    updateFields.slug = slugify(heading, { lower: true, strict: true }); // Update slug if heading changes
  }

  if (req.file) {
    try {
      const blogDetails = await Blog.findById(id);

      if (!blogDetails) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // Delete the old image if a new one is uploaded
      const oldImagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'blogimg', blogDetails.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        }
      });

      updateFields.image = req.file.filename; // Update image if a new one is uploaded
    } catch (error) {
      return res.status(500).json({ message: 'Error handling image deletion' });
    }
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog item by ID
const deleteBlogById = async (req, res) => {
  const id = req.params.id;

  try {
    const blogPost = await Blog.findById(id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Construct the image path
    const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'blogimg', blogPost.image);

    // Delete the blog entry
    await Blog.findByIdAndDelete(id);

    // Delete the image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return res.status(500).json({ message: 'Failed to delete the image' });
      }

      res.json({ message: 'Blog post and image deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById, upload
};
