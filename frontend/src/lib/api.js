import axios from 'axios';

const api = axios.create({
  baseURL: 'https://b020-64-227-181-181.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

export default api;
