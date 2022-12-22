import { reactive, ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import router from "@/router";
import { userinfo } from "@/api/module/admin/dto";
export const useUserStore = defineStore(
	"user",
	() => {
		const logined = ref<boolean>(false);
		const userinfo = reactive<userinfo>({
			id: 0,
			admin: false,
			avatar: "",
			email: "",
			nickname: "",
			permissions: []
		});
		/** 設置用戶信息——这个方法可能会经常用到*/
		const setInfo = (result: userinfo) => {
			if (!logined.value) {
				userinfo.id = result.id;
				userinfo.admin = result.admin;
				userinfo.avatar = result.avatar || "https://povcms-1251273463.cos.ap-chengdu.myqcloud.com/49392476-2cb7-40c0-b843-397386b21fcd.jpg";
				userinfo.email = result.email;
				userinfo.nickname = result.nickname || "迭名";
				userinfo.permissions = result.permissions;
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
		return { userinfo, logined, setInfo, loginOut };
	},
	{ persist: true }
);
// 初始化数据-这一步不是必须的，甚至hui
// if (typeof getAccessToken() === "string" && typeof getRefreshToken() === "string") {
// 	useUserStore(store).setInfo();
// }
/** 在 setup 外使用 */
export function useUserStoreHook() {
	return useUserStore(store);
}
