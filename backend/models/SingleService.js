const mongoose = require("mongoose");
const slugify = require("slugify");

const serviceSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: { 
    type: [String], 
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
    enum: ['draft', 'published', 'archived'], 
    default: 'draft',
  },
});

// Middleware to generate slug before saving the document
serviceSchema.pre('save', function (next) {
  if (this.isModified('heading')) { 
    this.slug = slugify(this.heading, { lower: true, strict: true });
  }
  this.updatedAt = Date.now(); // Update the updatedAt field
  next();
});

// Create a new Collection
const SingleService = new mongoose.model('SingleService', serviceSchema);

module.exports = SingleService;
