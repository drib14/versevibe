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
    const response = await API.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error signing up' };
  }
};

export const signin = async (userData) => {
  try {
    const response = await API.post('/api/auth/signin', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error signing in' };
  }
};


export const getUserProfile = async (userId) => {
  try {
    const response = await API.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user profile' };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await API.put(`/api/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating user' };
  }
};

export const updateUserAvatar = async (userId, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    const response = await API.put(`/api/users/${userId}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating avatar' };
  }
};

export const getUserPoems = async (userId) => {
  try {
    const response = await API.get(`/api/users/${userId}/poems`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user poems' };
  }
};

export const getUserLikedPoems = async (userId) => {
  try {
    const response = await API.get(`/api/users/${userId}/liked`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching liked poems' };
  }
};

export const createPoem = async (poemData) => {
  try {
    const response = await API.post('/api/poems/create', poemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating poem' };
  }
};

export const getAllPoems = async (tag) => {
  try {
    const response = await API.get('/api/poems', { params: { tag } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching poems' };
  }
};

export const getTrendingTags = async () => {
  try {
    const response = await API.get('/api/poems/trending-tags');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching trending tags' };
  }
};

export const getPoemById = async (poemId) => {
  try {
    const response = await API.get(`/api/poems/${poemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching poem' };
  }
};

export const updatePoem = async (poemId, poemData) => {
  try {
    const response = await API.put(`/api/poems/${poemId}`, poemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating poem' };
  }
};

export const deletePoem = async (poemId) => {
  try {
    const response = await API.delete(`/api/poems/${poemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting poem' };
  }
};

export const toggleLikePoem = async (poemId) => {
  try {
    const response = await API.put(`/api/poems/${poemId}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error toggling like' };
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await API.post('/api/comments', commentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating comment' };
  }
};

export const getCommentsForPoem = async (poemId) => {
  try {
    const response = await API.get(`/api/comments/${poemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching comments' };
  }
};

export const toggleLikeComment = async (commentId) => {
  try {
    const response = await API.put(`/api/comments/${commentId}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error toggling like on comment' };
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await API.get('/api/users/search', { params: { query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error searching users' };
  }
};

export default API;