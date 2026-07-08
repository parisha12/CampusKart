const Wishlist = require('../models/Wishlist');

// ==============================
// Add product to wishlist
// ==============================
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const existing = await Wishlist.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existing) {
      return res.status(400).json({
        message: 'Product already in wishlist',
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user.id,
      product: productId,
    });

    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Get user's wishlist
// ==============================
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate('product');

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Remove product from wishlist
// ==============================
const removeFromWishlist = async (req, res) => {
  try {
    const item = await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: req.params.productId,
    });

    if (!item) {
      return res.status(404).json({
        message: 'Item not found',
      });
    }

    res.json({
      message: 'Removed from wishlist',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Check if product is in wishlist
// ==============================
const checkWishlist = async (req, res) => {
  try {
    const item = await Wishlist.findOne({
      user: req.user.id,
      product: req.params.productId,
    });

    res.json({
      wishlisted: !!item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
};
