import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-xl
      transition
      overflow-hidden
      "
    >
      <div className="relative">
        <img
          src={
            product.image || 'https://via.placeholder.com/500x400?text=No+Image'
          }
          alt={product.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
          }}
          className="
          w-full
          h-52
          object-cover
          "
        />

        <span
          className="
          absolute
          top-3
          right-3
          bg-blue-100
          text-blue-700
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          "
        >
          {product.condition}
        </span>
      </div>

      <div className="p-5">
        <h2
          className="
          text-xl
          font-bold
          truncate
          "
        >
          {product.title}
        </h2>

        <p
          className="
          text-blue-600
          text-2xl
          font-bold
          mt-2
          "
        >
          Rs. {product.price}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-yellow-500">⭐</span>

          <span className="font-semibold">
            {product.averageRating
              ? product.averageRating.toFixed(1)
              : 'No ratings'}
          </span>

          {product.reviewCount > 0 && (
            <span className="text-gray-500 text-sm">
              ({product.reviewCount})
            </span>
          )}
        </div>

        <div className="mt-3 text-sm text-gray-600 space-y-1">
          <p>Category: {product.category}</p>

          <p>Type: {product.type}</p>
        </div>

        <Link
          to={`/products/${product._id}`}
          className="
          block
          text-center
          mt-5
          bg-blue-600
          text-white
          py-3
          rounded-xl
          font-semibold
          hover:bg-blue-700
          transition
          "
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
