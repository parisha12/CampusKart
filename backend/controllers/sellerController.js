const Product = require('../models/Product');
const User = require('../models/User');

const getSellerStore = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id).select(
      'name email createdAt'
    );

    if (!seller) {
      return res.status(404).json({
        message: 'Seller not found',
      });
    }

    const products = await Product.aggregate([
      {
        $match: {
          seller: seller._id,
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewCount: {
            $size: '$reviews',
          },
          averageRating: {
            $cond: [
              {
                $gt: [{ $size: '$reviews' }, 0],
              },
              {
                $avg: '$reviews.rating',
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          reviews: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const totalProducts = products.length;

    const totalReviews = products.reduce(
      (sum, product) => sum + product.reviewCount,
      0
    );

    const averageRating =
      totalReviews > 0
        ? products.reduce(
            (sum, product) => sum + product.averageRating * product.reviewCount,
            0
          ) / totalReviews
        : 0;

    res.json({
      seller,
      totalProducts,
      totalReviews,
      averageRating,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSellerStore,
};