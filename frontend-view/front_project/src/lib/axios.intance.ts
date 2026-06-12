// import axios from "axios";
// import Cookies  from "js-cookie";
// import { AppConfig } from "../config/app.config";

// export const apiInstance = axios.create({
//   baseURL: AppConfig.api_url,
//   withCredentials: true,
// });

// apiInstance.interceptors.request.use(
//   (config) => {

//     const token = Cookies.get("access_token");

//     console.log("Check Token here",token);

//     if (token) {
//       config.headers.Authorization =
//         `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );