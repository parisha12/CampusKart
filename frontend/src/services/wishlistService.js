import api from './api';

// Get wishlist
export const getWishlist = async () => {
  const { data } = await api.get('/wishlist');
  return data;
};

// Add to wishlist
export const addToWishlist = async (productId) => {
  const { data } = await api.post('/wishlist', { productId });
  return data;
};

// Remove from wishlist
export const removeFromWishlist = async (productId) => {
  const { data } = await api.delete(`/wishlist/${productId}`);
  return data;
};

// Check wishlist
export const checkWishlist = async (productId) => {
  const { data } = await api.get(`/wishlist/check/${productId}`);
  return data;
};
