const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const {
  initiateEsewaPayment,
  esewaSuccess,
  esewaFailure,
} = require('../controllers/paymentController');

console.log('✅ paymentRoutes loaded');

router.post('/esewa/initiate', authMiddleware, initiateEsewaPayment);

router.get('/test', (req, res) => {
  res.send('Payment route working');
});

router.get('/esewa/success', esewaSuccess);

router.get('/esewa/failure', esewaFailure);

module.exports = router;
