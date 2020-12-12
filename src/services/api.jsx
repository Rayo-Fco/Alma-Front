import axios from 'axios';

const api = axios.create({  
  baseURL: "https://api.alma-app.cl",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;