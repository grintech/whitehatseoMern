const mongoose = require("mongoose");
const slugify = require("slugify");


const ourWorksSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      // required: true,
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

  ourWorksSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  this.updatedAt = Date.now(); // Update the updatedAt field
  next();
});

// We will create a new Collection

const OurWorks = mongoose.model('OurWorks', ourWorksSchema);

module.exports = OurWorks;

