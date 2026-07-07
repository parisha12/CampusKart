import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';

// Get cart
export const getCart = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem('token');

  const response = await axios.post(
    `${API_URL}/add`,
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Update quantity
export const updateCartQuantity = async (productId, quantity) => {
  const token = localStorage.getItem('token');

  const response = await axios.put(
    `${API_URL}/${productId}`,
    {
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Remove item
export const removeFromCart = async (productId) => {
  const token = localStorage.getItem('token');

  const response = await axios.delete(`${API_URL}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
