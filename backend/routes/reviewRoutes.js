const express = require('express');

const router = express.Router();

const {
  addReview,
  getProductReviews,
} = require('../controllers/reviewController');

const protect = require('../middleware/authMiddleware');

// Add review

router.post('/', protect, addReview);

// Get product reviews

router.get('/:productId', getProductReviews);

module.exports = router;
