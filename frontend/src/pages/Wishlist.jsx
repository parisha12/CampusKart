import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';
import { addToCart } from '../services/cartService';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [removeId, setRemoveId] = useState(null);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      setLoadingId(productId);

      await removeFromWishlist(productId);

      setWishlist((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );

      toast.success('Removed from wishlist ❤️');
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove item');
    } finally {
      setLoadingId(null);
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      setLoadingId(productId);

      await addToCart(productId, 1);

      await removeFromWishlist(productId);

      setWishlist((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );

      toast.success('Moved to cart 🛒');
    } catch (error) {
      console.log(error);
      toast.error('Failed to move to cart');
    } finally {
      setLoadingId(null);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-5"
        >
          ❤️
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-800 mb-3">My Wishlist</h1>

        <p className="text-gray-500 text-lg mb-8">
          You haven't saved any products yet.
        </p>

        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">My Wishlist ❤️</h1>

        <p className="text-gray-500 mt-2">{wishlist.length} saved product(s)</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -8,
            }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
          >
            <div className="relative">
              {item.product.image ? (
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-60 object-cover"
                />
              ) : (
                <div className="h-60 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-2 shadow">
                ❤️
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                {item.product.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {item.product.category}
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-3">
                Rs. {item.product.price}
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to={`/products/${item.product._id}`}
                  className="block text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2.5 rounded-xl transition"
                >
                  View Details
                </Link>

                <button
                  disabled={loadingId === item.product._id}
                  onClick={() => handleMoveToCart(item.product._id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition"
                >
                  {loadingId === item.product._id
                    ? 'Moving...'
                    : '🛒 Move to Cart'}
                </button>

                <button
                  disabled={loadingId === item.product._id}
                  onClick={() => setRemoveId(item.product._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition"
                >
                  {loadingId === item.product._id ? 'Removing...' : 'Remove ❤️'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {removeId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full mx-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Remove Product?
            </h2>

            <p className="text-gray-500 mb-6">
              Are you sure you want to remove this item from your wishlist?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setRemoveId(null)}
                className="flex-1 border rounded-xl py-2"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleRemove(removeId);
                  setRemoveId(null);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2"
              >
                Remove
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;
