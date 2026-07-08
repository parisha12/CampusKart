import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reviews';

// Get reviews for product

export const getProductReviews = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);

  return response.data;
};

// Add review

export const addReview = async (reviewData, token) => {
  const response = await axios.post(API_URL, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
