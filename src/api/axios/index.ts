// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import localStorage from "@/utils/cache/localStorage";
type Result<T> = {
	code: number;
	message: string;
	result: T;
	data: T;
};
class Request {
	// axios 实例
	instance: AxiosInstance;
	// 基础配置，url和超时时间
	baseConfig: AxiosRequestConfig = {
		baseURL: import.meta.env.VITE_BASE_API,
		timeout: 60000,
		headers: {
			// 携带 Token
			Authorization: localStorage.get("access_token") ? (localStorage.get("access_token") as string) : ""
			// "Content-Type": "" //get(config, "headers.Content-Type", "application/json")
		}
	};
	constructor(config: AxiosRequestConfig) {
		// 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
		this.instance = axios.create(Object.assign(this.baseConfig, config));
		// 請求攔截
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				return config;
			},
			(error: any) => {
				return Promise.reject(error);
			}
		);
		//響應攔截
		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				return Promise.resolve(res);
			},
			(error: any) => {
				return Promise.reject(error);
			}
		);
	}
	// 定义请求方法
	public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
		return this.instance.request(config);
	}
	public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
		return this.instance.get(url, config);
	}

	public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
		return this.instance.post(url, data, config);
	}

	public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
		return this.instance.put(url, data, config);
	}

	public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
		return this.instance.delete(url, config);
	}
}

export default new Request({});
