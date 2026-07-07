const Cart = require('../models/Cart');

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if already in cart
    const existingItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();

      return res.status(200).json({
        message: 'Quantity updated',
        cart: existingItem,
      });
    }

    const cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity: 1,
    });

    res.status(201).json({
      message: 'Product added to cart',
      cart: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate(
      'product',
      'title price image category condition location'
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update cart item quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: 'Cart item not found',
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        message: 'Quantity must be at least 1',
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      message: 'Quantity updated successfully',
      cart: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: 'Cart item not found',
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      message: 'Item removed from cart',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
};
