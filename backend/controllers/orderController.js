const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place Order
const placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate(
      'product'
    );

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty',
      });
    }

    const items = cartItems.map((item) => ({
      product: item.product._id,
      seller: item.product.seller,
      quantity: item.quantity,
    }));

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      buyer: req.user.id,
      items,
      totalAmount,
    });

    // Clear cart after placing order
    await Cart.deleteMany({ user: req.user.id });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Buyer's Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyer: req.user.id,
    })
      .populate({
        path: 'items.product',
        select: 'title price image category condition',
      })
      .sort({ createdAt: -1 });

    const updatedOrders = orders.map((order) => {
      return {
        ...order.toObject(),
        items: order.items.map((item) => ({
          ...item.toObject(),
          product: item.product || {
            title: 'Product unavailable',
            price: 0,
            image: '',
            category: 'N/A',
            condition: 'N/A',
          },
        })),
      };
    });

    res.json(updatedOrders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Seller's Orders
const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.seller': req.user.id,
    })
      .populate('buyer', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    // Check seller owns this order
    const sellerOrder = order.items.some(
      (item) => item.seller.toString() === req.user.id
    );

    if (!sellerOrder) {
      return res.status(403).json({
        message: 'You are not allowed to update this order',
      });
    }

    // Allowed status changes
    const allowedTransitions = {
      Pending: ['Accepted', 'Cancelled'],
      Accepted: ['Completed'],
      Completed: [],
      Cancelled: [],
    };

    if (!allowedTransitions[order.status].includes(status)) {
      return res.status(400).json({
        message: `Cannot change order from ${order.status} to ${status}`,
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Cancel Order (Buyer)
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      buyer: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({
        message: 'Order cannot be cancelled now',
      });
    }

    order.status = 'Cancelled';

    await order.save();

    res.json({
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  placeOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  cancelOrder,
};
