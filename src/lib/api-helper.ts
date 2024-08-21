import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { AppConstants, getLS } from "./utils";
import { IAuthToken } from "@/types/auth";
import { logger } from "./logger";

export const END_POINTS = {
  base_url: "https://7485-115-244-167-18.ngrok-free.app/",

  // Auth
  LOGIN: "/users/login",
  
  // User
  CREATE_USER: "/users",
  GET_USERS: "/users",
  GET_USERBY_ID: (id: string) => `/users/${id}`,
  UPDATE_USER: (id: string) => `users/${id}`,
  DELETE_USER: (id: string) => `users/${id}`,

  // Documents
  GET_FILE: (path: string) => `s3/file?filepath=${path}`,
  UPLOAD_FILE: '/s3',
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
    config: AxiosRequestConfig<C>
  ) {
    return await this.instance.post<R>(url, body, config);
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
    config: AxiosRequestConfig<C>
  ) {
    return await this.instance.put<R>(url, body, config);
  }

  /**
   * Delete request
   * @param url Endpoint
   * @param config Request config of type C
   * @returns R is return type wrapped in Axios response
   */
  public async delete<R, C = any>(url: string, config: AxiosRequestConfig<C>) {
    return await this.instance.delete<R>(url, config);
  }
}

export default Object.freeze(APIHelper);