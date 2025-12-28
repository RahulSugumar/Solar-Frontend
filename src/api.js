import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to insert Custom User ID if present
api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
        config.headers['X-User-ID'] = userId;
    }
    return config;
});

export default api;
