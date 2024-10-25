const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: { // Changed 'image' to 'images' to reflect multiple uploads
    type: [String], // Array of strings to hold multiple image URLs
    // required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'], // Example statuses, adjust as needed
    default: 'draft',
  },
});

// Middleware to generate slug before saving the document
blogSchema.pre('save', function (next) {
  if (this.isModified('heading')) { // Changed 'title' to 'heading' to match the schema
    this.slug = slugify(this.heading, { lower: true, strict: true });
  }
  this.updatedAt = Date.now(); // Update the updatedAt field
  next();
});

// Create a new Collection
const SingleBlog = new mongoose.model('SingleBlog', blogSchema);

module.exports = SingleBlog;
