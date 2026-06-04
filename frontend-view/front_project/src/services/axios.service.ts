import { Axios, AxiosResponse } from "axios";
import { apiInstance } from "../lib/axios.intance";

export class AxiosService {
  async post<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<T>> {
    return apiInstance.post<T>(url, data);
  }

  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<AxiosResponse<T>> {
    return apiInstance.get<T>(url, {
      params,
    });
  }


  async delete<T>(url:string):Promise<AxiosResponse<T>> {
    return apiInstance.delete<T>(url);
  }

  async put<T,D = unknown>(
    url:string,
    data?:D,
  ): Promise<AxiosResponse<T>> {
    return apiInstance.put<T>(url,data);
  }
}
