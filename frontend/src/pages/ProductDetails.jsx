import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

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

  if (!product) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}

        <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover rounded-xl"
            />
          ) : (
            'Product Image'
          )}
        </div>

        {/* Product Info */}

        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-2xl text-blue-600 font-semibold mt-4">
            Rs. {product.price}
          </p>

          <p className="mt-4 text-gray-600">Condition: {product.condition}</p>

          <p className="mt-4 text-gray-600">Category: {product.category}</p>

          <p className="mt-6">{product.description}</p>

          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
