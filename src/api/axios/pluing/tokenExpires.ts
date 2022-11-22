/*
 * @Description:
 * @User: Chen
 * @Date: 2022-11-19 05:23:52
 */
import { resultType } from "@/api";
import { type AxiosResponse, type AxiosError } from "axios";
import { request } from "../index";
// tokenExpiresResponse
import { setAccessToken, setRefreshToken } from "@/utils/cache/localStorage";
// 判断是否在刷新token中
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requestList: any[] = [];
export const tokenExpiresResponse = (res: AxiosResponse<resultType>) => {
	if (res.data.code === 1050 || res.data.code === 1003) {
		const config = res.config;
		if (!isRefreshing) {
			isRefreshing = true;
			return request({
				method: "tranbiot-core/cms/user/refresh",
				url: "get"
			})
				.then((success) => {
					// 刷新成功
					const { refreshToken, accessToken } = success.data;
					setAccessToken(accessToken);
					setRefreshToken(refreshToken);
					config.headers!.Authorization = accessToken;
					requestList.forEach((cb) => cb(accessToken));
					requestList = [];
					return config;
				})
				.catch((error) => {
					console.error("都过期了", error);
				})
				.finally(() => {
					isRefreshing = false;
				});
		} else {
			// 正在刷新token，将返回一个未执行resolve的promise
			return new Promise((resolve) => {
				requestList.push((token: string) => {
					// config.baseURL = "";
					config.headers!.Authorization = token;
					resolve(config);
				});
			});
			return config;
		}
	}
	return res;
};
export const tokenExpiresError = (res: AxiosError<resultType>) => {
	console.log(res.response?.data.code);
	return res;
};
