import axios from "axios";
import url from "@/src/constants/axiosUrl";

// Use your computer's LAN IP instead of localhost if testing on a physical device. by cmd>ipconfig
const API = axios.create({ baseURL: `${url}/api/users` }); 

export const signup = (userData) => API.post("/signup", userData);
export const login = (userData) => API.post("/login", userData);
