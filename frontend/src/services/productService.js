import api from './api';

// Add Product
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);

  return response.data;
};

// Get Products
export const getProducts = async () => {
  const response = await api.get('/products');

  return response.data;
};

// Get Single Product
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

// Update Product
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);

  return response.data;
};

// Get My Products
export const getMyProducts = async () => {
  const response = await api.get('/products/my-products');

  return response.data;
};
