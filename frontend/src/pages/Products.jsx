import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [sort, setSort] = useState('');

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

  const categories = ['All', ...new Set(products.map((item) => item.category))];

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setCondition('All');
    setSort('');
  };

  const filteredProducts = [...products]
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (category === 'All' ? true : item.category === category))
    .filter((item) =>
      condition === 'All' ? true : item.condition === condition
    )
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Marketplace</h1>

      <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-lg"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="All">All Conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">Sort By Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>

        <button
          onClick={resetFilters}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="h-52 bg-gray-100">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="font-bold text-lg">{item.title}</h2>

              <p className="text-blue-600 text-xl font-bold mt-2">
                Rs. {item.price}
              </p>

              <div className="flex justify-between mt-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    item.condition === 'new' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {item.condition}
                </span>
              </div>

              <Link
                to={`/products/${item._id}`}
                className="block mt-5 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center mt-10 text-gray-500 text-lg">
          No products found.
        </p>
      )}
    </div>
  );
}

export default Products;
