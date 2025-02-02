import axios from "axios";

const API = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Log the request details
    console.log('Making request to:', config.url);
    console.log('Request method:', config.method);
    console.log('Request headers:', config.headers);

    if (!config.url?.includes('/auth/')) {
      const token = config.headers?.Authorization;
      if (token) {
        config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });

    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (typeof window !== 'undefined') {
            window.location.href = '/auth';
          }
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Error in request configuration
      console.error('Request configuration error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);

// Budget endpoints
export const getBudgets = (token) => {
  console.log('Getting budgets with token:', token);
  return API.get("/budget", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const addBudget = (data, token) => 
  API.post("/budget", data, { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  });

// Expense endpoints
export const getExpenses = (budgetId, token) => 
  API.get(`/expense/${budgetId}`, { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  });

export const addExpense = (data, token) => 
  API.post("/expense", data, { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  });

export default API;