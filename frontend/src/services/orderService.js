import axios from 'axios';

const API = 'http://localhost:5000/api/orders';

export const placeOrder = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.post(
    API,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getMyOrders = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${API}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getSellerOrders = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${API}/seller-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const updateOrderStatus = async (id, status) => {
  const token = localStorage.getItem('token');

  const response = await axios.put(
    `${API}/${id}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const cancelOrder = async (id) => {
  const token = localStorage.getItem('token');

  const response = await axios.put(
    `${API}/cancel/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
