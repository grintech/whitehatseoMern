const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    productType: {
        type: String,
        enum: ['normal', 'variation'], // Assuming two types: normal and variation
        default: 'normal',
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    brand: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
   
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;