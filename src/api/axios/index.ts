// index.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";
// setAccessToken, getRefreshToken, setRefreshToken
import { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken } from "@/utils/cache/localStorage";
// import { useUserStoreHook } from "@/store/modules/user";
// const userStore = useUserStoreHook();
import { get } from "lodash-es";
import { resultType } from "@/api";
// import { ElMessage } from "element-plus";
// import { responseInterceptors } from "./interceptors/res";
import { requestInterceptors } from "./interceptors/req";
import Admin from "../module/admin/admin";
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
			config = requestInterceptors(config);
			return config;
		},
		// 发送失败
		(error) => Promise.reject(error)
	);
	// 响应拦截（可根据具体业务作出相应的调整）
	service.interceptors.response.use(
		(response: AxiosResponse<resultType>) => {
			const { config, data } = response;
			// 成功的请求
			if (response.status.toString().charAt(0) === "2") {
				return response;
			}
			// 在错误范围的请求
			// eslint-disable-next-line no-async-promise-executor
			return new Promise(async (resolve) => {
				// 我们必须要先判断是否是refreshToken也过期，否则会无限循环刷新
				const isCode: number[] = [1000, 1041, 1051, 1050, 1052, 1003, 1001, 1042];
				if (isCode.includes(data.code)) {
					if (config.url !== "tranbiot-core/cms/user/refresh") {
						const refreshResult = await Admin.refreshToken();
						setAccessToken(refreshResult.data.data.access_token);
						setRefreshToken(refreshResult.data.data.refresh_token);
						// if (response.config.method === "get") {
						// 	response.config.data = { unused: 0 };
						// }
						service.defaults.headers!.Authorization = refreshResult.data.data.access_token;
						response.config.headers!.Authorization = refreshResult.data.data.access_token;
						const result = await service.request({
							baseURL: import.meta.env.VITE_BASE_API,
							url: response.config.url,
							method: response.config.method,
							data: response.config.data,
							params: response.config.params
						});
						return resolve(result);
					} else {
						console.log("登录过期");
					}
				}
			});
			// response = responseInterceptors(response, service);
			return response;
		},
		(error: AxiosError<resultType>) => {
			console.log(error);
			return error;
		}
	);
	return service;
}

/** 创建请求的方法*/
function createRequestFunction(service: AxiosInstance) {
	return function (config: AxiosRequestConfig) {
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

/** 用于网络请求的实例——自定义config */
export const service = createService();
/** 用于网络请求的方法 */
export const request = createRequestFunction(service);
