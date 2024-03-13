import { BASE_URL } from "@/constants/endpoints";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export  class AxSecure {
    instance;
    constructor(url:string) {
      const baseUrl = url
  
      this.instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      this.setupInterceptors();
    }
  
    setupInterceptors() {
      this.instance.interceptors.request.use(
        (config) => {
          if(typeof window != "undefined"){
            const token = localStorage.getItem("token");
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }

          }

  
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  
      this.instance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log(error);

          return Promise.reject(error);
        }
      );
    }
  
    get(url: string, config?: AxiosRequestConfig<any> | undefined) {
      return this.instance.get(url, config);
    }
  
    post(url: string, data: any, config?: { headers: any; }) {
      const contentType =
        data instanceof FormData ? "multipart/form-data" : "application/json";
      const headers = {
        ...(config?.headers || {}),
        "Content-Type": contentType,
      };
      const updatedConfig = { ...config, headers };
      
      return this.instance.post(url, data, updatedConfig);
    }
}
  
  // const axsecure = new AxSecure();
  
  // export default axsecure;
  