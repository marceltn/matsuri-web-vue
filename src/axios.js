import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (err) => {
  return Promise.reject(err);
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    window.location = '/';
  }

  return Promise.reject(error);
});

export default instance;