const express = require('express');
const { getSellerStore } = require('../controllers/sellerController');

const router = express.Router();

router.get('/:id', getSellerStore);

module.exports = router;
