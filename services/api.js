import axios from "axios";

// Use your computer's LAN IP instead of localhost if testing on a physical device. by cmd>ipconfig
const API = axios.create({ baseURL: `http://192.168.0.102:5106/api/users` }); 

export const signup = (userData) => API.post("/signup", userData);
export const login = (userData) => API.post("/login", userData);
