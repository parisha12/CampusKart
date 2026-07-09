const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order');
const { generatePaymentData } = require('../utils/esewa');

const initiateEsewaPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    const transactionUuid = uuidv4();

    order.transactionId = transactionUuid;
    await order.save();

    const paymentData = generatePaymentData({
      amount: order.totalAmount,
      transactionUuid,
      productCode: process.env.ESEWA_PRODUCT_CODE,
    });

    res.json({
      paymentUrl: process.env.ESEWA_PAYMENT_URL,
      paymentData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const esewaSuccess = async (req, res) => {
  try {
    const { transaction_uuid } = req.query;

    const order = await Order.findOne({
      transactionId: transaction_uuid,
    });

    if (!order) {
      return res.status(404).send('Order not found');
    }

    order.paymentStatus = 'Paid';
    await order.save();

    res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
  } catch (error) {
    console.error(error);

    res.status(500).send('Payment verification failed');
  }
};

const esewaFailure = async (req, res) => {
  try {
    const { transaction_uuid } = req.query;

    const order = await Order.findOne({
      transactionId: transaction_uuid,
    });

    if (order) {
      order.paymentStatus = 'Failed';
      await order.save();
    }

    res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  } catch (error) {
    console.error(error);

    res.status(500).send('Payment failed');
  }
};

module.exports = {
  initiateEsewaPayment,
  esewaSuccess,
  esewaFailure,
};
