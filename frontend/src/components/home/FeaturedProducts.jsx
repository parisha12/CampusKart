import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productService';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts(search, category);

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  return (
    <section className="bg-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 md:w-60"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Furniture">Furniture</option>
            <option value="Notes">Notes</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <>
            {/* No Products */}
            {products.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                No products found.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-md p-5"
                  >
                    <div className="bg-gray-200 h-40 rounded-lg mb-4 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      ) : (
                        'Product Image'
                      )}
                    </div>

                    <h3 className="font-bold">{product.title}</h3>

                    <p className="text-blue-600 mt-2">Rs. {product.price}</p>

                    <p className="text-sm text-gray-500">{product.condition}</p>

                    <Link
                      to={`/products/${product._id}`}
                      className="block text-center mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
