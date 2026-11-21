import axios from "axios";

const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

const instance = axios.create({
  baseURL: `${apiUrl}/api`,
  timeout: 10000,
});

export default instance;
