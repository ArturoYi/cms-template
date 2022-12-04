/* eslint-disable no-async-promise-executor */
import { type AxiosResponse, type AxiosError } from "axios";
import { resultType } from "@/api";
import { service } from "../index";
import Admin from "../../module/admin/admin";
import { setAccessToken, setRefreshToken } from "@/utils/cache/localStorage";
import { ElMessage } from "element-plus";
export const responseInterceptors = async (response: AxiosResponse<resultType>): Promise<AxiosResponse<resultType<any>, any>> => {
	const { config, data } = response;
	const res = await new Promise<AxiosResponse<resultType>>(async (resolve, reject) => {
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
				return reject(response);
				console.log("登录过期");
			}
		} else {
			ElMessage.error(response.data.message);
			return reject(response);
		}
	});
	return res;
};

export const errorInterceptors = (config: AxiosError<resultType>): AxiosError<resultType, any> => {
	// 发现token过期在错误中返回很难处理
	return config;
};
