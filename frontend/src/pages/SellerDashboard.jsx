import { useState } from 'react';
import { createProduct } from '../services/productService';

const SellerDashboard = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    type: '',
    image: '',
    location: '',
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createProduct(product);

      console.log(data);

      alert('Product added successfully');

      setProduct({
        title: '',
        description: '',
        price: '',
        category: '',
        condition: '',
        type: '',
        image: '',
        location: '',
      });
    } catch (error) {
      console.log(error);

      alert('Failed to add product');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600">Seller Dashboard</h1>

      <p className="mt-4 text-gray-600">
        Manage your products, add new items, and track sales.
      </p>

      <div className="mt-8 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product title"
            value={product.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <select
            name="condition"
            value={product.condition}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Condition</option>

            <option value="new">New</option>

            <option value="like-new">Like New</option>

            <option value="used">Used</option>
          </select>

          <select
            name="type"
            value={product.type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Type</option>

            <option value="sell">Sell</option>

            <option value="rent">Rent</option>

            <option value="exchange">Exchange</option>
          </select>

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={product.location}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerDashboard;
