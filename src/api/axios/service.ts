import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

/** 创建请求实例 */
function createService() {
	// 创建一个 Axios 实例
	const service = axios.create();
	// 请求拦截
	service.interceptors.request.use(
		(config) => config,
		// 发送失败
		(error) => Promise.reject(error)
	);
	// 响应拦截（可根据具体业务作出相应的调整）
	service.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			return error;
		}
	);
	return service;
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
	return function (config: AxiosRequestConfig) {
		const configDefault = {
			// headers: {
			// 	// 携带 Token
			// 	Authorization: "Bearer " + getToken(),
			// 	"Content-Type": get(config, "headers.Content-Type", "application/json")
			// },
			timeout: 5000,
			baseURL: import.meta.env.VITE_BASE_API,
			data: {}
		};
		return service(Object.assign(configDefault, config));
	};
}

/** 用于网络请求的实例 */
export const service = createService();
/** 用于网络请求的方法 */
export const request = createRequestFunction(service);
