import api from './api';

export const getSellerStore = async (sellerId) => {
  const { data } = await api.get(`/sellers/${sellerId}`);
  return data;
};