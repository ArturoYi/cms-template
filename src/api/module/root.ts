import _axios from "@/api/axios/index";

type LoginType = {
	username: string;
	password: string;
};

class Root {
	// 登錄獲取token
	async getToken(params: LoginType) {
		const res = await _axios.post("tranbiot-core/cms/user/login", params);
		return res;
	}
	// 獲取用戶信息
	async getInfo() {
		const res = await _axios.get("tranbiot-core/cms/user/permissions");
		return res;
	}
	// 獲取用戶的權限組
	async getPermissions() {
		const res = await _axios.get("tranbiot-core/cms/user/permissions");
		return res;
	}
	// 獲取所有權限分組
}
export default new Root();
