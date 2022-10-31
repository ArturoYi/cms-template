import { request } from "@/api/axios/index";

type LoginType = {
	username: string;
	password: string;
};

class Root {
	// 登錄獲取token
	async getToken(data: LoginType) {
		return request({
			url: "tranbiot-core/cms/user/login",
			method: "post",
			data: data
		});
	}
	// 獲取用戶信息
	async getInfo() {
		return request({
			url: "tranbiot-core/cms/user/permissions",
			method: "get"
		});
	}
	// 獲取用戶的權限組
	async getPermissions() {
		return request({
			url: "tranbiot-core/cms/user/permissions",
			method: "get"
		});
	}
	// 獲取所有權限分組
}
export default new Root();
