import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://taskmanage-qooe.onrender.com', 
    withCredentials: true, 
});
export default axiosInstance