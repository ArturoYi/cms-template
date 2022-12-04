// index.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";
// setAccessToken, getRefreshToken, setRefreshToken
import { getAccessToken, getRefreshToken } from "@/utils/cache/localStorage";
import { get } from "lodash-es";
import { resultType } from "@/api";
// import { ElMessage } from "element-plus";
import { responseInterceptors } from "./interceptors/res";
import { requestInterceptors } from "./interceptors/req";
// import Admin from "../module/admin/admin";

/** 创建请求实例 */
function createService<T>() {
	// 创建一个 Axios 实例
	const service = axios.create();
	// 请求拦截-添加token不在这里
	service.interceptors.request.use(
		(config) => {
			config = requestInterceptors(config);
			return config;
		},
		// 发送失败
		(error) => Promise.reject(error)
	);
	// 响应拦截（可根据具体业务作出相应的调整）
	service.interceptors.response.use(
		async (response: AxiosResponse<resultType<T>>) => {
			// 成功的请求
			if (response.status.toString().charAt(0) === "2") {
				return response;
			}
			// 在错误范围的请求——主要为刷新token
			return await responseInterceptors(response);
		},
		(error: AxiosError<resultType<any>>) => {
			console.log(error);
			return error;
		}
	);
	return service;
}
/** 用于网络请求的实例——自定义config */
export const service = createService<any>();
/** 创建请求的方法*/
export function createRequestFunction<T = any>(service: AxiosInstance) {
	return function (config: AxiosRequestConfig): Promise<AxiosResponse<resultType<T>, any>> {
		const configDefault: AxiosRequestConfig = {
			headers: {
				// 携带 Token
				Authorization: getAccessToken() || getRefreshToken(),
				"Content-Type": get(config, "headers.Content-Type", "application/json")
			},
			timeout: 5000,
			baseURL: import.meta.env.VITE_BASE_API,
			// `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
			// 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
			// 则promise 将会 resolved，否则是 rejected。
			validateStatus: function (status: number) {
				return status >= 200 && status < 510; // 默认值
			}
			// `transformRequest` 允许在向服务器发送前，修改请求数据
			// 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
			// 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
			// 你可以修改请求头。
		};
		return service(Object.assign(configDefault, config));
	};
}
/** 这个只是折中办法,多了一步，并不好，但是这样是为了响应结果自定义 */
export function typeRequest<T>() {
	return createRequestFunction<T>(service);
}
/** 用于网络请求的方法 */
export const request = createRequestFunction<any>(service);
