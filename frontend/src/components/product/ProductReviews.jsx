import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProductReviews, addReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

function ProductReviews({ productId }) {
  const { token } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getProductReviews(productId);
        setReviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !review.trim()) {
      toast.error('Please add rating and review');
      return;
    }

    try {
      const newReview = await addReview(
        {
          product: productId,
          rating,
          comment: review,
        },
        token
      );

      setReviews((prev) => [newReview, ...prev]);

      toast.success('Review submitted ⭐');

      setRating(0);
      setReview('');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  if (loading) {
    return <div className="mt-16 text-gray-500">Loading reviews...</div>;
  }

  return (
    <div className="mt-16 bg-white rounded-3xl shadow-lg p-6 sm:p-8">
      <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-4xl font-extrabold">
            {reviews.length
              ? (
                  reviews.reduce((sum, item) => sum + item.rating, 0) /
                  reviews.length
                ).toFixed(1)
              : '0.0'}{' '}
            ⭐
          </h3>

          <p className="text-gray-600 mt-2">
            Based on {reviews.length} reviews
          </p>

          <div className="mt-5 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(
                (item) => item.rating === star
              ).length;

              const percentage = reviews.length
                ? (count / reviews.length) * 100
                : 0;

              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-10">{star}★</span>

                  <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <span className="text-sm text-gray-500">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-bold text-xl mb-4">Write a Review</h3>

          <div className="flex gap-2 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl ${
                  rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            className="w-full h-32 rounded-xl border p-4 outline-none"
          />

          <button
            className="
              mt-4
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              font-bold
            "
          >
            Submit Review
          </button>
        </form>
      </div>

      <div className="mt-10 space-y-5">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((item) => (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                border
                rounded-2xl
                p-5
              "
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-bold">{item.user?.name || 'User'}</h4>

                  <p className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
                >
                  Verified Buyer
                </span>
              </div>

              <div className="text-yellow-400 mt-3">
                {'★'.repeat(item.rating)}
              </div>

              <p className="text-gray-600 mt-3">{item.comment}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
