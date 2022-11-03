import { request } from "@/api/axios/index";

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
