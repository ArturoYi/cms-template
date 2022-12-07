import { reactive, ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import Admin from "@/api/module/admin/admin";
import router from "@/router";
// suportLocalstorage, getUserInfo, setUserInfo, getIsLoged, setIsLoged
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "@/utils/cache/localStorage";
import { userinfo } from "@/api/module/admin/dto";
export const useUserStore = defineStore("user", () => {
	const logined = ref<boolean>(false);
	const userinfo = reactive<userinfo>({
		id: 0,
		admin: false,
		avatar: "",
		email: "",
		nickname: "",
		permissions: []
	});
	/** 把登录请求写在这里方便全局状态管理*/
	const login = async (user_form: any) => {
		const result = await Admin.getToken(user_form);
		setAccessToken(result.data.access_token);
		setRefreshToken(result.data.refresh_token);
	};
	/** 設置用戶信息——这个方法可能会经常用到*/
	const setInfo = async () => {
		if (!logined.value) {
			const result = await Admin.getInfo();
			console.log(result);
			userinfo.id = result.data.id;
			userinfo.admin = result.data.admin;
			userinfo.avatar = result.data.avatar || "https://povcms-1251273463.cos.ap-chengdu.myqcloud.com/49392476-2cb7-40c0-b843-397386b21fcd.jpg";
			userinfo.email = result.data.email;
			userinfo.nickname = result.data.nickname || "迭名";
			userinfo.permissions = result.data.permissions;
			logined.value = true;
			return true;
		}
	};

	// 退出登录
	const loginOut = () => {
		localStorage.clear();
		router.push({ path: "/login", replace: true });
	};
	//虽然可以直接使用pinia获取上面的职，但是习惯还是写两个get和set方法调用
	/** 设置角色数组 */
	/** 設置用戶信息*/
	return { userinfo, logined, setInfo, login, loginOut };
});
// 初始化数据-这一步不是必须的，甚至hui
if (typeof getAccessToken() === "string" && typeof getRefreshToken() === "string") {
	useUserStore(store).setInfo();
} else {
	// console.log("退出登录");
}
/** 在 setup 外使用 */
export function useUserStoreHook() {
	return useUserStore(store);
}
