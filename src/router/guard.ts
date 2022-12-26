import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
// import { resetRouter } from "./index";
// import Admin from "@/api/module/admin/admin";
import { request } from "@/api/axios/index";
import { userinfo } from "@/api/module/admin/dto";
router.beforeEach(async (to, form, next) => {
	// 只能在路由钩子内使用pinia
	const userStore = useUserStoreHook();
	/**要考虑多种情况
	 * 1. 是否登录
	 * 2. 没登录
	 *    - 是否有token,尝试获取用户最新信息
	 *    - 无token或登录失效以及獲取用戶信息失敗,需要重新登录
	 */
	if (userStore.logined) {
		if (to.path === "/login") {
			next({ path: "/" });
		} else {
			//本質上不用再判斷，因為沒權限的會自動404
			next();
		}
	} else {
		if (to.path === "/login") {
			next();
		} else {
			const userRes = await request<userinfo>({
				url: "tranbiot-core/cms/user/permissions",
				method: "get"
			});
			userStore.setInfo(userRes.data.data);
			userStore.permission.forEach((item) => {
				router.addRoute("Layout", item);
			});
			//必須重定向路由
			next({ path: `${to.path}` });
		}
	}
});

/** 参数依然有to, form, next，只是没遇到就不加了 **/
router.afterEach((to) => {
	// 跳转成功设置标题
	document.title = to.meta.title ? to.meta.title : "回收项目";
	// 返回顶部
	window.screenTop = 0;
});
