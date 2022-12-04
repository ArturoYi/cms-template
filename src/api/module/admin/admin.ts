// eslint-disable-next-line @typescript-eslint/triple-slash-reference
import { request, typeRequest } from "@/api/axios/index";
// setAccessToken, setRefreshToken
import { getRefreshToken } from "@/utils/cache/localStorage";
import { AdminLoginType, GroupType } from "./admin-type";
class Admin {
	// 登錄獲取token
	async getToken(data: AdminLoginType) {
		// 登录获取token
		const res = request({
			url: "tranbiot-core/cms/user/login",
			method: "post",
			data: data
		});
		return res;
	}
	// 刷新token
	async refreshToken() {
		const res = request({
			url: "tranbiot-core/cms/user/refresh",
			method: "get",
			headers: {
				Authorization: getRefreshToken()
			}
		});
		return res;
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
		const res = await request({
			url: "tranbiot-core/cms/user/permissions",
			method: "get"
		});
		return res;
	}
	// 獲取權限分組列表
	async getGroupList(params: object) {
		const re = typeRequest<GroupType[]>();
		const res = await re({
			url: "/tranbiot-core/cms/admin/group/all",
			method: "get",
			params
		});
		return res.data;
	}
	// 编辑权限组
	async putGroup(id: number, data: GroupType) {
		const res = await request({
			url: `/tranbiot-core/cms/admin/group/${id}/update`,
			method: "put",
			data
		});
		return res.data;
	}
	// 删除权限组
	async deleteGroup(id: number) {
		const res = await request({
			url: `/tranbiot-core/cms/admin/group/${id}/del`,
			method: "delete"
		});
		return res.data;
	}
	// 添加权限组
	async postGroup(data: { name: string; info: string }) {
		const res = await request({
			url: "/tranbiot-core/cms/admin/group/add",
			method: "post",
			data
		});
		return res.data;
	}
	// 获取所有权限
	async getAllPermissions() {
		const res = await request({
			url: "/tranbiot-core/cms/admin/permission",
			method: "get"
		});
		return res.data;
	}
	// 获取权限组详情
	async getGroupDetail(id: number) {
		const res = await request({
			url: `/tranbiot-core/cms/admin/group/${id}/detail`,
			method: "get"
		});
		return res.data;
	}
}
export default new Admin();
