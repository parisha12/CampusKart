const express = require('express');

const router = express.Router();

const {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const protect = require('../middleware/authMiddleware');

// Create Product
router.post('/', protect, createProduct);

// Get All Products
router.get('/', getProducts);


// Get Logged-in Seller Products
router.get('/my-products', protect, getMyProducts);

// Get Product By ID
router.get('/:id', getProductById);

// Update Product
router.put('/:id', protect, updateProduct);

// Delete Product
router.delete('/:id', protect, deleteProduct);

module.exports = router;
