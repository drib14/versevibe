import axios from 'axios';

const API = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const signup = async (userData) => {
  try {
    const response = await API.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error signing up' };
  }
};

export const signin = async (userData) => {
  try {
    const response = await API.post('/auth/signin', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error signing in' };
  }
};


export const getUserProfile = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user profile' };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await API.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating user' };
  }
};

export const updateUserAvatar = async (userId, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    const response = await API.put(`/users/${userId}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating avatar' };
  }
};

export const getUserPoems = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/poems`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user poems' };
  }
};

export const getUserLikedPoems = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/liked`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching liked poems' };
  }
};

export const createPoem = async (poemData) => {
  try {
    const response = await API.post('/poems/create', poemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating poem' };
  }
};

export const getAllPoems = async () => {
  try {
    const response = await API.get('/poems');
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching poems' };
  }
};

export const getPoemById = async (poemId) => {
  try {
    const response = await API.get(`/poems/${poemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching poem' };
  }
};

export const updatePoem = async (poemId, poemData) => {
  try {
    const response = await API.put(`/poems/${poemId}`, poemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating poem' };
  }
};

export const deletePoem = async (poemId) => {
  try {
    const response = await API.delete(`/poems/${poemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting poem' };
  }
};

export const toggleLikePoem = async (poemId) => {
  try {
    const response = await API.put(`/poems/${poemId}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error toggling like' };
  }
};

export default API;