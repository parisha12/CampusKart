import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import { getSellerStore } from '../services/sellerService';

const SellerStore = () => {
  const { id } = useParams();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchStore();
  }, [id]);

  const fetchStore = async () => {
    try {
      const data = await getSellerStore(id);
      setStore(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!store) return [];

    let products = [...store.products];

    if (search.trim()) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case 'low':
        products.sort((a, b) => a.price - b.price);
        break;

      case 'high':
        products.sort((a, b) => b.price - a.price);
        break;

      default:
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return products;
  }, [store, search, sort]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-lg">
        Loading seller store...
      </div>
    );
  }

  if (!store) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-red-500">
        Seller not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl overflow-hidden shadow-xl mb-10"
      >
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-40" />

        <div className="bg-white px-8 pb-8">
          <div className="-mt-12 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600">
                {store.seller.name.charAt(0)}
              </div>

              <div>
                <h1 className="text-4xl font-bold">{store.seller.name}</h1>

                <p className="text-gray-600 mt-1">{store.seller.email}</p>

                <p className="text-gray-500 mt-2">
                  Member since{' '}
                  {new Date(store.seller.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-2xl p-5 text-center min-w-[120px]">
                <p className="text-3xl font-bold text-blue-600">
                  {store.totalProducts}
                </p>
                <p>Products</p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-5 text-center min-w-[120px]">
                <p className="text-3xl font-bold text-yellow-600">
                  ⭐ {store.averageRating.toFixed(1)}
                </p>
                <p>Rating</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center min-w-[120px]">
                <p className="text-3xl font-bold text-green-600">
                  {store.totalReviews}
                </p>
                <p>Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <input
          type="text"
          placeholder="Search seller products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-3 w-full md:w-96"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="newest">Newest</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      <h2 className="text-3xl font-bold mb-6">
        Products ({filteredProducts.length})
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
          <h3 className="text-2xl font-bold mb-3">
            No matching products found
          </h3>

          <p className="text-gray-500">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerStore;
