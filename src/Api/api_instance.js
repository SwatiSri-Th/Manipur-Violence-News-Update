import axios from "axios";

// const instance = axios.create({
// })
const token = window.localStorage.getItem("token");
const instance = axios.create({
  // baseURL: "http://192.168.167.248:5000",
  // baseURL: "https://flaskappmanipur.onrender.com", 
  baseURL: "http://127.0.0.1:5000",   
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
