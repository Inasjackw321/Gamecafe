// API wrapper that switches between backend API and localStorage based on environment
import axios from 'axios';
import { authAPI, gamesAPI, isGitHubPages } from './localStorageAPI';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const USE_LOCAL_STORAGE = isGitHubPages();

// Create axios instance for backend API
const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

// Add auth token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API wrapper
export const api = {
  // Auth endpoints
  auth: {
    register: async (username, email, password) => {
      if (USE_LOCAL_STORAGE) {
        return await authAPI.register(username, email, password);
      }
      const response = await axiosInstance.post('/auth/register', { username, email, password });
      return response.data;
    },

    login: async (username, password) => {
      if (USE_LOCAL_STORAGE) {
        return await authAPI.login(username, password);
      }
      const response = await axiosInstance.post('/auth/login', { username, password });
      return response.data;
    }
  },

  // Games endpoints
  games: {
    getAll: async () => {
      if (USE_LOCAL_STORAGE) {
        return await gamesAPI.getAll();
      }
      const response = await axiosInstance.get('/games');
      return response.data;
    },

    getById: async (id) => {
      if (USE_LOCAL_STORAGE) {
        return await gamesAPI.getById(id);
      }
      const response = await axiosInstance.get(`/games/${id}`);
      return response.data;
    },

    create: async (gameData) => {
      if (USE_LOCAL_STORAGE) {
        return await gamesAPI.create(gameData);
      }
      const response = await axiosInstance.post('/games', gameData);
      return response.data;
    },

    update: async (id, gameData) => {
      if (USE_LOCAL_STORAGE) {
        return await gamesAPI.update(id, gameData);
      }
      const response = await axiosInstance.put(`/games/${id}`, gameData);
      return response.data;
    },

    delete: async (id) => {
      if (USE_LOCAL_STORAGE) {
        return await gamesAPI.delete(id);
      }
      const response = await axiosInstance.delete(`/games/${id}`);
      return response.data;
    },

    incrementPlays: async (id) => {
      if (USE_LOCAL_STORAGE) {
        return await gamesAPI.incrementPlays(id);
      }
      const response = await axiosInstance.post(`/games/${id}/play`);
      return response.data;
    },

    like: async (id) => {
      if (USE_LOCAL_STORAGE) {
        return await gamesAPI.like(id);
      }
      const response = await axiosInstance.post(`/games/${id}/like`);
      return response.data;
    }
  }
};

export const getEnvironmentInfo = () => {
  return {
    usingLocalStorage: USE_LOCAL_STORAGE,
    apiBaseUrl: API_BASE_URL,
    hostname: window.location.hostname
  };
};
