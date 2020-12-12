import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin" : "*",
  },
});

export default api;