import axios from 'axios'

let sessionToken = localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null;

const api = axios.create({
    baseURL: 'https://localhost:8082',
    headers: { Authorization: `Bearer ${sessionToken}` }
});

export default api;