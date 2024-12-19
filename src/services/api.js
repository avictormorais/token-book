import axios from 'axios';
const baseURL = 'https://localhost:7777';

const api = axios.create({
    baseURL: baseURL,
});

export default api;