import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gvvc-project-backend.onrender.com/' // proxy in package.json will forward to backend
});

export default api;
