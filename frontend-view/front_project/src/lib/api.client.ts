import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { AUTH } from "../constants/api-end-points.constants";
import { AppConfig } from "../config/app.config";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: AppConfig.api_url,
  withCredentials: true,
});

interface JwtPayload {
  id: number;
  role: string;
  exp: number;
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(
      `${AppConfig.api_url}${AUTH.REFRESH}`,
      {
        refresh_token: refreshToken,
      },
      {
        withCredentials: true,
      },
    );

    const newToken = response.data.data.access_token;
    if (!newToken) {
      return null;
    }
    Cookies.set("access_token", newToken);
    return newToken;
  }catch (error) {
  console.error(error);

  Cookies.remove("access_token");

  return null;
}
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      let token = Cookies.get("access_token");

     if (!token) {
  const newToken = await refreshAccessToken();

  if (newToken) {
    token = newToken;
  } else {
    return config;
  }
}

      const decoded = jwtDecode<JwtPayload>(token);
      const expiryTime = decoded.exp * 1000;
      const bufferTime = 30000;
      const isExpiring = expiryTime - Date.now() < bufferTime;
      if (isExpiring) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }

        const newToken = await refreshPromise;
        if (newToken) {
          token = newToken;
        }
      }

      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
  console.error(error);

  Cookies.remove("access_token");

  return config;
}
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (error.response?.status === 401) {
     Cookies.remove("access_token");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
