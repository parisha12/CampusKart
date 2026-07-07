import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { addToCart } from '../services/cartService';

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const data = await addToCart(product._id, 1);

      console.log('Added to cart:', data);

      alert('Product added to cart');
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert('Failed to add product');
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Link
        to="/products"
        className="inline-block mb-8 text-blue-600 hover:underline font-semibold"
      >
        ← Back to Marketplace
      </Link>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2 gap-10 p-8">
        {/* Product Image */}
        <div>
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[500px] object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-[500px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-xl">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
              {product.category}
            </span>

            <h1 className="text-4xl font-bold mt-5">{product.title}</h1>

            <p className="text-3xl font-bold text-blue-600 mt-5">
              Rs. {product.price}
            </p>

            <div className="mt-6 space-y-3">
              <p>
                <span className="font-semibold">Condition:</span>{' '}
                {product.condition}
              </p>

              <p>
                <span className="font-semibold">Type:</span> {product.type}
              </p>

              <p>
                <span className="font-semibold">Location:</span>{' '}
                {product.location}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Description</h2>

              <p className="text-gray-600 leading-7">{product.description}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Add to Cart
            </button>

            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Seller Information */}
      <div className="bg-white shadow-lg rounded-2xl mt-10 p-8">
        <h2 className="text-2xl font-bold mb-6">Seller Information</h2>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">Seller:</span>{' '}
            {product.user?.name || 'CampusKart Seller'}
          </p>

          <p>
            <span className="font-semibold">Email:</span>{' '}
            {product.user?.email || 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
