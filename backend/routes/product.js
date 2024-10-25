const express = require('express');
const router = express.Router();
const {  createProduct, getAllProducts, getProductsById, updateProductById, deleteProductById,deleteAllProducts, upload} = require('../controllers/productController');


// Routes

// Create a new product 
router.post("/products", upload.single('image'), createProduct);

// Get all product items
router.get("/products", getAllProducts);

// Get a specific product item by ID
router.get("/products/:id", getProductsById);

// Update a product item by ID
router.put("/products/:id", upload.single('image'), updateProductById);

// Delete a product item by ID
router.delete("/products/:id", deleteProductById);

// Delete all products and their images
router.delete("/products", deleteAllProducts);

module.exports = router;