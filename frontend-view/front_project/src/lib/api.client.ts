import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { AUTH } from "../constants/api-end-points.constants";
import { AppConfig } from "../config/app.config";

interface JwtPayload {
  id: number;
  role: string;
  exp: number;
}

 export const apiClient = axios.create({
  baseURL: AppConfig.api_url,
  withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

const saveTokens = (
  accessToken: string,
  refreshToken: string
) => {
  Cookies.set("access_token", accessToken);
  Cookies.set("refresh_token", refreshToken);
};

const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  localStorage.removeItem("user");
};

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) {
      clearTokens();
      return null;
    }

    const { data } = await axios.post(
      `${AppConfig.api_url}${AUTH.REFRESH}`,
      {
        refresh_token: refreshToken,
      },
      {
        withCredentials: true,
      }
    );

    const accessToken = data.data.access_token;
    const newRefreshToken = data.data.refresh_token;

    saveTokens(accessToken, newRefreshToken);

    return accessToken;
  } catch (error) {
    clearTokens();
    return null;
  }
};


apiClient.interceptors.request.use(
  async (config) => {
    const publicRoutes = [
      AUTH.LOGIN,
      AUTH.REGISTER,
      AUTH.REFRESH,
    ];

    const isPublicRoute = publicRoutes.some(
      (route) => config.url?.includes(route)
    );

    if (isPublicRoute) {
      return config;
    }

    let token : string | any = Cookies.get("access_token");

    if (!token) {
      token = await refreshAccessToken();

      if (!token) {
        return Promise.reject(
          new Error("Session expired")
        );
      }
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const expiresSoon =
        decoded.exp * 1000 - Date.now() < 30000;

      if (expiresSoon) {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken()
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newToken = await refreshPromise;

        if (!newToken) {
          return Promise.reject(
            new Error("Session expired")
          );
        }

        token = newToken;
      }
    } catch {
      clearTokens();

      return Promise.reject(
        new Error("Invalid token")
      );
    }

    config.headers.Authorization =
      `Bearer ${token}`;

    return config;
  }
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearTokens();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


