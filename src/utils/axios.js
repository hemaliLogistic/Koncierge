import axios from "axios";
import { HOST_API } from "../../predict";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.47:1337/api/v1/",
  //   baseURL: "http://3.232.124.157:1337/api/v1",
  // baseURL: "https://api.koncierge.lu/api/v1",
});

export default axiosInstance;
