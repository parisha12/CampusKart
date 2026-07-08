import { useEffect, useState } from 'react';
import {
  createProduct,
  getMyProducts,
  deleteProduct,
  updateProduct,
} from '../services/productService';
import { uploadImage } from '../services/uploadService';

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

  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProducts = async () => {
    try {
      const data = await getMyProducts();

      console.log(data);

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = product.image;

      if (imageFile) {
        setUploading(true);

        const uploadData = await uploadImage(imageFile);

        console.log('UPLOAD RESPONSE:', uploadData);

        imageUrl = uploadData.imageUrl;
      }
      console.log('Uploaded Image URL:', imageUrl);
      const updatedProduct = {
        ...product,
        image: imageUrl,
      };

      let data;

      if (editMode) {
        data = await updateProduct(editId, updatedProduct);
      } else {
        data = await createProduct(updatedProduct);
      }

      console.log(data);

      alert(
        editMode ? 'Product updated successfully' : 'Product added successfully'
      );

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

      setImageFile(null);
      setEditMode(false);
      setEditId(null);

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert(editMode ? 'Failed to update product' : 'Failed to add product');
    } finally {
      setUploading(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      alert('Product deleted successfully');

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert('Failed to delete product');
    }
  };
  const handleEdit = (item) => {
    setProduct({
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      condition: item.condition,
      type: item.type,
      image: item.image,
      location: item.location,
    });

    setEditId(item._id);

    setEditMode(true);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600">Seller Dashboard</h1>

      <p className="mt-4 text-gray-600">
        Manage your products, add new items, and track sales.
      </p>

      {/* Add Product Form */}

      <div className="mt-8 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">
          {uploading
            ? 'Uploading Image...'
            : editMode
              ? 'Update Product'
              : 'Add Product'}
        </h2>

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
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
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
            {editMode ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* My Products */}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">My Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg shadow-md p-4 bg-white"
              >
                <img
                  src={
                    item.image ||
                    'https://via.placeholder.com/300x200?text=No+Image'
                  }
                  alt={item.title}
                  className="w-full h-48 object-cover rounded"
                />

                <h3 className="text-xl font-bold mt-4">{item.title}</h3>

                <p className="text-gray-600 mt-2">{item.description}</p>

                <p className="font-semibold mt-2">Price: Rs. {item.price}</p>

                <p>Category: {item.category}</p>

                <p>Condition: {item.condition}</p>

                <p>Type: {item.type}</p>

                <p>Location: {item.location}</p>

                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
