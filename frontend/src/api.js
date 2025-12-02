import axios from "axios";
/*
// Browser can reach backend via localhost + exposed ports
export const API_AUTH = "http://localhost:4000/auth";
export const API_CATALOGUE = "http://localhost:5000/products";
*/
// If the app's running on k8s then mention correct service name
const API_AUTH = process.env.REACT_APP_API_AUTH || "/auth";
const API_CATALOGUE = process.env.REACT_APP_API_CATALOGUE || "/products";

export { API_AUTH, API_CATALOGUE };
/*
export const API_AUTH = "http://auth-service:4000/auth";
export const API_CATALOGUE = "http:/catalogue-service:5000/products";
*/
// Create an axios instance
const api = axios.create();

// Attach token automatically if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; // <-- export your axios instance, not plain axios
