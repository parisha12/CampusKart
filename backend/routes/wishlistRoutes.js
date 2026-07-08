const express = require('express');
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
} = require('../controllers/wishlistController');

const protect = require('../middleware/authMiddleware');

// Get wishlist
router.get('/', protect, getWishlist);

// Check if a product is wishlisted
router.get('/check/:productId', protect, checkWishlist);

// Add to wishlist
router.post('/', protect, addToWishlist);

// Remove from wishlist
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
