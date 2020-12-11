import axios from 'axios';

const api = axios.create({
  baseURL: "https://alma-app.cl:3001",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin" : "*",
  },
});

export default api;