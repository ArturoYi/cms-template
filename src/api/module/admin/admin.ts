// eslint-disable-next-line @typescript-eslint/triple-slash-reference
import { request } from "@/api/axios/index";
// setAccessToken, setRefreshToken
import { getRefreshToken } from "@/utils/cache/localStorage";
import { AdminLoginType } from "./admin-type";
class Admin {
	// 登錄獲取token
	async getToken(data: AdminLoginType) {
		console.log(data);
		const res = request({
			url: "tranbiot-core/cms/user/login",
			method: "post",
			data: data
		});
		return res;
	}
	// 刷新token
	async refreshToken() {
		return request({
			url: "tranbiot-core/cms/user/refresh",
			method: "get",
			headers: {
				Authorization: getRefreshToken()
			}
		});
	}
	// 獲取用戶信息
	async getInfo() {
		const res = await request({
			url: "tranbiot-core/cms/user/permissions",
			method: "get"
		});
		return res.data;
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
export default new Admin();
