import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { getProductById, getProducts } from '../services/productService';
import { addToCart } from '../services/cartService';
import ProductReviews from '../components/product/ProductReviews';

import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from '../services/wishlistService';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);

        setError('Failed to load product');
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const data = await checkWishlist(id);

        setWishlisted(data.wishlisted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlistStatus();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const data = await getProducts('', product.category);

        const filtered = data.filter((item) => item._id !== id);

        setRelatedProducts(filtered.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product, id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);

      toast.success('Product added to cart 🛒');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(product._id, quantity);

      navigate('/checkout');
    } catch (error) {
      toast.error('Failed to proceed to checkout');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success('Product link copied 🔗');
    } catch (error) {
      toast.error('Unable to copy link');
    }
  };

  const handleWishlist = async () => {
    try {
      setWishlistLoading(true);

      if (wishlisted) {
        await removeFromWishlist(product._id);

        setWishlisted(false);

        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(product._id);

        setWishlisted(true);

        toast.success('Added to wishlist ❤️');
      }
    } catch (error) {
      toast.error('Wishlist operation failed');
    } finally {
      setWishlistLoading(false);
    }
  };

  if (error) {
    return (
      <div
        className="
      max-w-xl
      mx-auto
      mt-20
      bg-red-50
      text-red-600
      p-8
      rounded-2xl
      text-center
      font-semibold
      "
      >
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      py-8
      sm:py-10
      "
      >
        <div
          className="
        animate-pulse
        grid
        md:grid-cols-2
        gap-10
        "
        >
          <div
            className="
          h-[520px]
          bg-gray-200
          rounded-3xl
          "
          ></div>

          <div className="space-y-6">
            <div
              className="
            h-10
            bg-gray-200
            rounded
            w-3/4
            "
            ></div>

            <div
              className="
            h-12
            bg-gray-200
            rounded
            w-1/2
            "
            ></div>

            <div
              className="
            h-40
            bg-gray-200
            rounded-2xl
            "
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
      max-w-7xl
      mx-auto
      px-6
      py-10
      "
    >
      <Link
        to="/products"
        className="
        mb-8
        inline-flex
        text-blue-600
        font-semibold
        "
      >
        ← Back to Marketplace
      </Link>

      <div
        className="
      bg-white
      rounded-3xl
      shadow-xl
      grid
      lg:grid-cols-2
      gap-8
      lg:gap-12
      p-5
      sm:p-8
      "
      >
        <div>
          <motion.img
            key={selectedImage}
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            src={
              selectedImage ||
              product.image ||
              'https://via.placeholder.com/800x600?text=No+Product+Image'
            }
            alt={product.title}
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/800x600?text=No+Product+Image';
            }}
            className="
    w-full
    h-[320px]
    sm:h-[420px]
    lg:h-[520px]
    object-cover
    rounded-2xl
    "
          />

          <div
            className="
    flex
    gap-3
    mt-5
    overflow-x-auto
    "
          >
            {[product.image].map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`
        min-w-[80px]
        h-20
        rounded-xl
        overflow-hidden
        border-2
        ${selectedImage === img ? 'border-blue-600' : 'border-gray-200'}
        `}
              >
                <img
                  src={img || 'https://via.placeholder.com/150?text=No+Image'}
                  alt="thumbnail"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/150?text=No+Image';
                  }}
                  className="
          w-full
          h-full
          object-cover
          "
                />
              </button>
            ))}
          </div>
        </div>

        <div
          className="
        flex
        flex-col
        justify-between
        "
        >
          <div>
            <span
              className="
            bg-blue-100
            text-blue-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            "
            >
              {product.category}
            </span>

            <span
              className="
            ml-3
            bg-green-100
            text-green-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            "
            >
              ✓ In Stock
            </span>

            <h1
              className="
            text-5xl
            font-extrabold
            mt-6
            "
            >
              {product.title}
            </h1>

            <p
              className="
            text-4xl
            font-bold
            text-blue-600
            mt-5
            "
            >
              Rs. {product.price}
            </p>

            <div
              className="
mt-4
flex
items-center
gap-3
"
            >
              <span className="text-yellow-500 text-2xl">⭐</span>

              <span className="font-bold text-lg">
                {product.averageRating
                  ? product.averageRating.toFixed(1)
                  : 'No ratings'}
              </span>

              {product.reviewCount > 0 && (
                <span className="text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              )}
            </div>
            <div className="mt-6">
              <p className="font-semibold mb-3">Quantity</p>

              <div className="flex gap-4 items-center">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="
                  bg-gray-200
                  w-10
                  h-10
                  rounded-lg
                  font-bold
                  "
                >
                  -
                </button>

                <span className="font-bold text-xl">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="
                  bg-blue-600
                  text-white
                  w-10
                  h-10
                  rounded-lg
                  font-bold
                  "
                >
                  +
                </button>
              </div>
            </div>

            <div
              className="
            mt-8
            bg-gray-50
            p-5
            rounded-2xl
            space-y-3
            "
            >
              <p>
                <b>Condition:</b> {product.condition}
              </p>

              <p>
                <b>Type:</b> {product.type}
              </p>

              <p>
                <b>Location:</b> {product.location}
              </p>
            </div>

            <h2
              className="
            text-2xl
            font-bold
            mt-8
            "
            >
              Description
            </h2>

            <p className="text-gray-600 mt-3">{product.description}</p>
          </div>

          <div
            className="
          flex
          gap-4
          mt-10
          flex-wrap
          "
          >
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleAddToCart}
              className="
              flex-1
              bg-blue-600
              text-white
              rounded-xl
              py-4
              font-bold
              "
            >
              🛒 Cart
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className="
              flex-1
              bg-gray-200
              rounded-xl
              py-4
              font-bold
              "
            >
              {wishlistLoading
                ? 'Please wait...'
                : wishlisted
                  ? '❤️ Wishlisted'
                  : '🤍 Wishlist'}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleShare}
              className="
              flex-1
              bg-purple-600
              text-white
              rounded-xl
              py-4
              font-bold
              "
            >
              🔗 Share
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleBuyNow}
              className="
              flex-1
              bg-green-600
              text-white
              rounded-xl
              py-4
              font-bold
              "
            >
              ⚡ Buy Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* Seller Information */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        onClick={() => navigate(`/seller/${product.seller._id}`)}
        className="
    mt-10
    bg-white
    shadow-lg
    rounded-3xl
    p-8
    cursor-pointer
    hover:shadow-2xl
    transition-all
    duration-300
  "
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Seller Information</h2>

          <span className="text-blue-600 font-semibold">Visit Store →</span>
        </div>

        <div className="flex items-center gap-5">
          <div
            className="
        w-16
        h-16
        rounded-full
        bg-blue-100
        flex
        items-center
        justify-center
        text-2xl
        font-bold
        text-blue-600
      "
          >
            {product.seller?.name?.charAt(0) || 'S'}
          </div>

          <div>
            <h3 className="font-bold text-lg">
              {product.seller?.name || 'CampusKart Seller'}
            </h3>

            <p className="text-gray-600">
              {product.seller?.email || 'Not Available'}
            </p>

            {product.seller?.createdAt && (
              <p className="text-sm text-gray-500 mt-1">
                Member since{' '}
                {new Date(product.seller.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Product Reviews */}

      <ProductReviews productId={product._id} />

      {/* Related Products */}

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2
            className="
            text-3xl
            font-bold
            mb-8
            "
          >
            Related Products
          </h2>

          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
            "
          >
            {relatedProducts.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{
                  scale: 1.03,
                }}
                onClick={() => {
                  navigate(`/products/${item._id}`);
                  window.scrollTo(0, 0);
                }}
                className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    overflow-hidden
                    cursor-pointer
                    "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                      w-full
                      h-48
                      object-cover
                      "
                />

                <div className="p-4">
                  <h3
                    className="
      font-bold
      truncate
    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
      text-blue-600
      font-bold
      mt-2
    "
                  >
                    Rs. {item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500">⭐</span>

                    <span className="font-medium">
                      {item.averageRating
                        ? item.averageRating.toFixed(1)
                        : 'No ratings'}
                    </span>

                    {item.reviewCount > 0 && (
                      <span className="text-gray-500 text-sm">
                        ({item.reviewCount})
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ProductDetails;
