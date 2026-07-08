import axios from 'axios';

const API_URL = 'http://localhost:5000/api/upload';

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append('image', file);

  const response = await axios.post(API_URL, formData);

  console.log('Upload API Response:', response.data);

  return response.data;
};
