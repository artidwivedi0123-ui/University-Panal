import { Axios, AxiosResponse } from "axios";
import { apiClient } from "../lib/api.client";

export class AxiosService {
  async post<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<T>> {
    return apiClient.post<T>(url, data);
  }

  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<AxiosResponse<T>> {
    return apiClient.get<T>(url, {
      params,
    });
  }


  async delete<T>(url:string):Promise<AxiosResponse<T>> {
    return apiClient.delete<T>(url);
  }

  async put<T,D = unknown>(
    url:string,
    data?:D,
  ): Promise<AxiosResponse<T>> {
    return apiClient.put<T>(url,data);
  }
}
