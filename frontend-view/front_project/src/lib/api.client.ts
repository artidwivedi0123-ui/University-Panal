import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { AUTH } from "../constants/api-end-points.constants";
import { AppConfig } from "../config/app.config";

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
    console.log("Check Refresh Token", refreshToken);

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
    console.log("New Token", newToken);
    if (!newToken) {
      return null;
    }
    Cookies.set("access_token", newToken);
    return newToken;
  } catch (error) {
    console.error(error);
    Cookies.remove("access_token");
    return null;
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    const url = config.url || "";
    if (
      url.includes(AUTH.LOGIN) ||
      url.includes(AUTH.REGISTER) ||
      url.includes(AUTH.REFRESH)
    ) {
      return config;
    }

    let token = Cookies.get("access_token");
    if (!token) {
      const newToken =
        await refreshAccessToken();

      if (!newToken) {
        return Promise.reject(
          new Error("Session Expired")
        );
      }

      token = newToken;
    }
    const decoded =
      jwtDecode<JwtPayload>(token);
    const expiryTime = decoded.exp * 1000;
    const bufferTime = 30000;
    if ( expiryTime - Date.now() < bufferTime) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(
            () => {
              isRefreshing = false;
              refreshPromise = null;
            }
          );
      }
      const newToken = await refreshPromise;
      if (!newToken) {
        return Promise.reject(
          new Error("Session Expired")
        );
      }
      token = newToken;
    }
    config.headers.Authorization =
      `Bearer ${token}`;
    return config;
  }
);
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error(
      "Response Error:",
      error.response?.status,
      error.response?.data,
    );

    return Promise.reject(error);
  },
);
export default apiClient;
