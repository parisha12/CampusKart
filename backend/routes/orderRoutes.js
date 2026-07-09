const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  cancelOrder,
  paymentSuccess,
  paymentFailed,
} = require('../controllers/orderController');

const protect = require('../middleware/authMiddleware');

// Buyer
router.post('/', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);
router.put('/cancel/:id', protect, cancelOrder);
router.put('/:id/payment-success', protect, paymentSuccess);
router.put('/:id/payment-failed', protect, paymentFailed);

// Seller
router.get('/seller-orders', protect, getSellerOrders);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
