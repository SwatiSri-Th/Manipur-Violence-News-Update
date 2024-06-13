import axios from "axios";

// const instance = axios.create({
// })

const instance = axios.create({
  baseURL: "http://192.168.0.226:5000",
  // baseURL: "https://flaskappmanipur.onrender.com"
  // baseURL:'http://127.0.0.1:5000'
});

export default instance;
