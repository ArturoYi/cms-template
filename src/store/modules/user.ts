import { reactive, ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { Root } from "@/type/module/roottype";
import localStorage from "@/utils/cache/localStorage";
import lodash from "@/utils/loadsh-es";
export const userStore = defineStore(
	"user",
	() => {
		const roles = ref<string[]>([]);
		const userinfo = reactive<Root>({
			id: 0,
			admin: false,
			avatar: "",
			email: "",
			nickname: "",
			permissions: []
		});
		/** 设置角色数组 */
		const setRoles = (value: string[]) => {
			roles.value = value;
		};
		/** 設置用戶信息*/
		const setInfo = (info: Root) => {
			localStorage.set("userinfo", userinfo);
			userinfo.id = info.id;
			userinfo.admin = info.admin;
			userinfo.avatar = info.avatar;
			userinfo.email = info.email;
			userinfo.nickname = info.nickname;
			userinfo.permissions = info.permissions;
			console.log(JSON.stringify(lodash.cloneDeep(userinfo)));
			localStorage.set("userinfo", JSON.stringify(lodash.cloneDeep(userinfo)));
		};
		return { roles, userinfo, setRoles, setInfo };
	},
	{ persist: true }
);

/** 在 setup 外使用 */
export function useUserStoreHook() {
	return userStore(store);
}
