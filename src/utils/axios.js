import axios from "axios";
import { HOST_API } from "../../predict";

const axiosInstance = axios.create({
  baseURL: "http://3.232.124.157:1337/api/v1",
});

export default axiosInstance;
