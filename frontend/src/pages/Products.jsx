import { useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products] = useState([
    {
      id: 1,
      name: 'Engineering Mathematics Book',
      price: 700,
      condition: 'Used',
    },
    {
      id: 2,
      name: 'Dell Laptop',
      price: 35000,
      condition: 'Good',
    },
    {
      id: 3,
      name: 'Scientific Calculator',
      price: 1200,
      condition: 'Like New',
    },
    {
      id: 4,
      name: 'Study Table',
      price: 2500,
      condition: 'Used',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              Product Image
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="font-semibold">{item.name}</h2>

              <p className="text-blue-600 font-bold mt-2">Rs. {item.price}</p>

              <p className="text-sm text-gray-500">
                Condition: {item.condition}
              </p>

              <Link
                to={`/products/${item.id}`}
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
