import axios from "axios";

// const instance = axios.create({
    // })
    
const instance = axios.create({
        // baseURL: "http://192.168.0.226:5000"
    baseURL: "https://flaskappmanipur.onrender.com"
})

export default instance