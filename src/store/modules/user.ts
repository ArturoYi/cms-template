import { reactive, ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { Root } from "@/type/module/roottype";
import root from "@/api/module/root";
import router from "@/router";
import { setAccessToken, setRefreshToken, suportLocalstorage, getUserInfo, setUserInfo, getIsLoged, setIsLoged } from "@/utils/cache/localStorage";
export const useUserStore = defineStore("user", () => {
	const logined = ref<boolean>(false);
	const userinfo = reactive<Root["userInfo"]>({
		id: 0,
		admin: false,
		avatar: "",
		email: "",
		nickname: "",
		permissions: []
	});
	/** 把登录请求写在这里方便全局状态管理*/
	const login = async () => {
		await root
			.getToken({ username: "root", password: "123456" })
			.then((res) => {
				setAccessToken(res.data.data.access_token);
				setRefreshToken(res.data.data.refresh_token);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	/** 設置用戶信息*/
	const setInfo = async () => {
		await root
			.getInfo()
			.then((res) => {
				userinfo.id = res.data.data.id;
				userinfo.admin = res.data.data.admin;
				userinfo.avatar = res.data.data.avatar;
				userinfo.email = res.data.data.email;
				userinfo.nickname = res.data.data.nickname;
				userinfo.permissions = res.data.data.permissions;
				logined.value = true;
				setUserInfo(userinfo);
				setIsLoged(true);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// 退出登录
	const loginOut = () => {
		router.go(0);
	};
	//虽然可以直接使用pinia获取上面的职，但是习惯还是写两个get和set方法调用
	/** 设置角色数组 */
	/** 設置用戶信息*/
	return { userinfo, logined, setInfo, login, loginOut };
});
// 监听更改_持久化
// useUserStore(store).$subscribe((_, store) => {
// 	console.log("持久化");
// 	localStorage.set("userinfo", JSON.stringify(lodash.cloneDeep(store.userinfo)));
// 	localStorage.set("logined", JSON.stringify(lodash.cloneDeep(store.logined)));
// });
// 初始化数据
if (suportLocalstorage()) {
	useUserStore(store).userinfo = getUserInfo() as Root["userInfo"];
	useUserStore(store).logined = getIsLoged();
}

/** 在 setup 外使用 */
export function useUserStoreHook() {
	if (useUserStore(store) !== null) {
		return useUserStore(store);
	} else {
		return null;
	}
}
