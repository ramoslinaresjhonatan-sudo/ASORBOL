import axios from 'axios';

/**
 * Custom Axios instance with base configuration.
 * Using VITE_API_URL from environment variables.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor (e.g., for adding auth tokens)
api.interceptors.request.use(
    (config) => {
        // You can add logic here to inject tokens from localStorage
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (e.g., for handling global errors)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error('Unauthorized access - potential token expiration');
        }
        return Promise.reject(error);
    }
);

export default api;
