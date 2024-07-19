import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.HOST_API || "http://3.232.124.157:1337/api/v1",
});

export default axiosInstance;
