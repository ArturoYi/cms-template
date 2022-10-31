// index.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
// setAccessToken, getRefreshToken, setRefreshToken
import { getAccessToken } from "@/utils/cache/localStorage";
// import { get } from "lodash-es";
// type Result<T> = {
// 	code: number;
// 	message: string;
// 	result: T;
// 	data: T;
// };

/** 创建请求实例 */
function createService() {
	// 创建一个 Axios 实例
	const service = axios.create();
	// 请求拦截-添加token不在这里
	service.interceptors.request.use(
		(config) => {
			console.log(config);
			return config;
		},
		// 发送失败
		(error) => Promise.reject(error)
	);
	// 响应拦截（可根据具体业务作出相应的调整）
	service.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error) => {
			return error;
		}
	);
	return service;
}

/** 创建请求的方法*/
function createRequestFunction(service: AxiosInstance) {
	return function (config: AxiosRequestConfig) {
		const configDefault = {
			headers: {
				// 携带 Token
				Authorization: "Bearer " + getAccessToken()
				// "Content-Type": get(config, "headers.Content-Type", "application/json")
			},
			timeout: 5000,
			baseURL: import.meta.env.VITE_BASE_API,
			data: {}
		};
		return service(Object.assign(configDefault, config));
	};
}

/** 用于网络请求的实例——自定义config */
export const service = createService();
/** 用于网络请求的方法 */
export const request = createRequestFunction(service);
