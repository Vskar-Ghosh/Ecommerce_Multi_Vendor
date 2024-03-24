import axios from "axios";
const local = "http://localhost:5000";
const production = "https://myshop-api-4vle.onrender.com";
let api_url = "";
let mode = "dev";

if (mode === "pro") {
  api_url = production;
} else {
  api_url = local;
}
const api = axios.create({
  baseURL: `${api_url}/api`,
  withCredentials: true,
});
export default api;
