import { request } from "@/api/axios/index";

/**
 * 这个是统一的响应体，必须和后端协调
 * */
export interface resultType<T = any> {
	code: number;
	data: T;
	message: string;
	request: string;
}

export interface ILoginData {
	/** admin 或 editor */
	username: string;
	/** 密码 */
	password: string;
}
/** 登录并返回 Token */
export function loginApi(data: ILoginData) {
	return request({
		url: "tranbiot-core/cms/user/login",
		method: "post",
		data
	});
}
