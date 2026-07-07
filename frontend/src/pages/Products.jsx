import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // Search filtering
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg mb-8"
      />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                'Product Image'
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="font-semibold">{item.title}</h2>

              <p className="text-blue-600 font-bold mt-2">Rs. {item.price}</p>

              <p className="text-sm text-gray-500">
                Condition: {item.condition}
              </p>

              <p className="text-sm text-gray-500">Category: {item.category}</p>

              <Link
                to={`/products/${item._id}`}
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No products message */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found</p>
      )}
    </div>
  );
}

export default Products;
