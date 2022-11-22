/* eslint-disable no-async-promise-executor */
import { type AxiosResponse, type AxiosError } from "axios";
import { resultType } from "@/api";
export const responseInterceptors = (response: AxiosResponse<resultType>) => {
	return response;
};

export const errorInterceptors = (config: AxiosError<resultType>): AxiosError<resultType, any> => {
	// 发现token过期在错误中返回很难处理
	return config;
};
