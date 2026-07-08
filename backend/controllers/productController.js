const mongoose = require('mongoose');
const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc    Add new product
// @route   POST /api/products
// @access  Seller
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      condition,
      type,
      image,
      location,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      condition,
      type,
      image,
      location,
      seller: req.user.id,
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Get all products
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: 'i',
      };
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    const products = await Product.aggregate([
      {
        $match: filter,
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
                $gt: [
                  {
                    $size: '$reviews',
                  },
                  0,
                ],
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

    const populatedProducts = await Product.populate(products, {
      path: 'seller',
      select: 'name email',
    });

    res.json(populatedProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// @desc Get single product

const getProductById = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
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
                $gt: [
                  {
                    $size: '$reviews',
                  },
                  0,
                ],
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
    ]);

    if (!products.length) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    const product = await Product.populate(products[0], {
      path: 'seller',
      select: 'name email',
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // Check ownership
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'You can only update your own products',
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // Check ownership
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'You can only delete your own products',
      });
    }

    await product.deleteOne();

    res.json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyProducts = async (req, res) => {
  console.log('✅ getMyProducts controller called');
  try {
    const products = await Product.find({
      seller: req.user.id,
    }).populate('seller', 'name email createdAt')

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
