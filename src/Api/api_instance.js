import axios from "axios";

// const instance = axios.create({
// })
const token = window.localStorage.getItem("token");
const instance = axios.create({
<<<<<<< HEAD
  // baseURL: "http://192.168.29.15:5000",
  // baseURL: "https://flaskappmanipur.onrender.com",
  baseURL: "http://127.0.0.1:5000",
=======
  baseURL: "http://139.59.24.128:5000",
  // baseURL: "https://flaskappmanipur.onrender.com",
  //   baseURL: "http://127.0.0.1:5000",
>>>>>>> 8a09b48be438381f2b32dda5205a706ee75042b7
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
