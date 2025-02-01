import axios from "axios";

const API = axios.create({ 
    baseURL: "http://localhost:5000/api",
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  API.interceptors.request.use(
    (config) => {
      console.log('Request:', config.method.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );
  
  API.interceptors.response.use(
    (response) => {
      console.log('Response Status:', response.status);
      return response;
    },
    (error) => {
      console.error('Response Error:', error.message);
      if (error.response) {
        console.error('Error Data:', error.response.data);
        console.error('Error Status:', error.response.status);
      }
      return Promise.reject(error);
    }
  );

export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);
  
  export const getBudgets = (token) => 
    API.get("/budget", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

export const addBudget = (data, token) => 
  API.post("/budget", data, { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  });

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