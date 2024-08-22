import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AppConstants, getLS } from "./utils";
import { IAuthToken } from "@/types/auth";
import { logger } from "./logger";
import { APIResponse } from "@/types/app";

export const END_POINTS = {
  base_url: "https://docscan-task.onrender.com/",

  // Auth
  LOGIN: "/users/login",

  // User
  CREATE_USER: "/users",
  GET_USERS: "/users",
  GET_USER_BY_ID: (id: string) => `/users/${id}`,
  UPDATE_USER: (id: string) => `users/${id}`,
  DELETE_USER: (id: string) => `users/${id}`,

  // Documents
  GET_FILES: (page: number, limit?: number) =>
    `/storage?limit=${limit || 10}&page=${page}`,
  GET_FILE: (path: string) => `/storage/file?filepath=${path}`,
  UPLOAD_FILE: "/storage",
};

class APIHelper {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: END_POINTS.base_url,
    });

    this.interceptReq();
  }

  private interceptReq() {
    this.instance.interceptors.request.use((config) => {
      // Auth token interception
      if (!config.headers.Authorization) {
        logger("Intercepting for auth token");
        const token = this.authInterceptor();
        config.headers.Authorization = token;
      }

      // return final config after intercepting
      return config;
    });
  }

  private authInterceptor() {
    const tokenObj = getLS<IAuthToken>(AppConstants.auth_token);
    const token = tokenObj?.token;

    return token;
  }

  /**
   * Get request
   * @param url - Endpoint
   * @param config - Request config of type C
   * @returns R is return type wrapped in Axios response
   */
  public async get<R, C = any>(url: string, config?: AxiosRequestConfig<C>) {
    return await this.instance.get<APIResponse<R>>(url, config);
  }

  /**
   * Get file
   * @param url - Endpoint
   * @param config - Request config of type C
   * @returns R is return type wrapped in Axios response
   */
  public async getFile<R, C = any>(url: string, config?: AxiosRequestConfig<C>) {
    return await this.instance.get<R>(url, config);
  }

  /**
   * Post request
   * @param url Endpoint
   * @param body Request body of type Q
   * @param config Request config of type C
   * @returns R is return type wrapped in Axios response
   */
  public async post<R, Q, C = any>(
    url: string,
    body: Q,
    config?: AxiosRequestConfig<C>
  ) {
    return await this.instance.post<APIResponse<R>>(url, body, config);
  }

  /**
   * Put request
   * @param url Endpoint
   * @param body Request body of type Q
   * @param config Request config of type C
   * @returns R is return type wrapped in Axios response
   */
  public async update<R, Q, C = any>(
    url: string,
    body: Q,
    config?: AxiosRequestConfig<C>
  ) {
    return await this.instance.put<R>(url, body, config);
  }

  /**
   * Delete request
   * @param url Endpoint
   * @param config Request config of type C
   * @returns R is return type wrapped in Axios response
   */
  public async delete<R, C = any>(url: string, config?: AxiosRequestConfig<C>) {
    return await this.instance.delete<R>(url, config);
  }
}

export default Object.freeze(new APIHelper());
