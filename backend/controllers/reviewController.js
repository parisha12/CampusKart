const Review = require('../models/Review');

// Add review

exports.addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    const Order = require('../models/Order');

    const purchased = await Order.findOne({
      buyer: req.user.id,
      status: 'Completed',
      'items.product': product,
    });

    if (!purchased) {
      return res.status(403).json({
        message: 'You can review only products you purchased',
      });
    }

    const existingReview = await Review.findOne({
      product,
      user: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        message: 'You already reviewed this product',
      });
    }

    const review = await Review.create({
      product,
      user: req.user.id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get product reviews

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate('user', 'name email')
      .sort({
        createdAt: -1,
      });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
