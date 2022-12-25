import { computed, reactive, ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import router from "@/router";
import { userinfo } from "@/api/module/admin/dto";
import { filterAsyncRoutes } from "@/router/permission/permission";
import allRouter from "@/router/config";
export const useUserStore = defineStore(
	"user",
	() => {
		const access_token = ref("");
		const refresh_token = ref("");
		const userinfo = reactive<userinfo>({
			id: 0,
			admin: false,
			avatar: "",
			email: "",
			nickname: "",
			permissions: []
		});
		const a = ref(1);
		const logined = ref<boolean>(false);
		const isRefresh = ref<boolean>(true);
		//计算路由数组
		const permission = computed(() => {
			console.log(allRouter, userinfo.permissions);
			return filterAsyncRoutes(allRouter, userinfo.permissions);
		});

		/** 設置用戶信息——这个方法可能会经常用到*/
		const setInfo = (result: userinfo) => {
			userinfo.id = result.id;
			userinfo.admin = result.admin;
			userinfo.avatar = result.avatar || "https://povcms-1251273463.cos.ap-chengdu.myqcloud.com/49392476-2cb7-40c0-b843-397386b21fcd.jpg";
			userinfo.email = result.email;
			userinfo.nickname = result.nickname || "迭名";
			userinfo.permissions = result.permissions;
			logined.value = true;
			return true;
		};

		// 退出登录
		const loginOut = () => {
			localStorage.clear();
			router.push({ path: "/login", replace: true });
		};
		return { userinfo, permission, isRefresh, a, refresh_token, access_token, setInfo, logined, loginOut };
	},
	{
		persist: [
			// { storage: sessionStorage, paths: ["userinfo", "a"] },
			{ key: "v3-admin-token", storage: localStorage, paths: ["refresh_token", "access_token"] }
		]
	}
);
// 初始化数据-这一步不是必须的，甚至hui
// if (typeof getAccessToken() === "string" && typeof getRefreshToken() === "string") {
// 	useUserStore(store).setInfo();
// }
/** 在 setup 外使用 */
export function useUserStoreHook() {
	return useUserStore(store);
}
