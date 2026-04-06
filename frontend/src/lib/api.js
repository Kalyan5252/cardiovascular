import axios from 'axios';

const api = axios.create({
  baseURL: 'https://75f6-64-227-181-181.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
