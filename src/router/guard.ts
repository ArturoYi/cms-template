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
	 *    - 无token或登录失效,需要重新登录
	 */
	if (userStore.logined) {
		if (to.path === "/login") {
			next({ path: "/" });
		} else {
			next();
		}
	} else {
		if (to.path === "/login") {
			next();
		} else {
			await request<userinfo>({
				url: "tranbiot-core/cms/user/permissions",
				method: "get"
			})
				.then((res) => {
					userStore.setInfo(res.data.data);
					userStore.permission.forEach((item) => {
						router.addRoute("Layout", item);
					});
					next({ path: `${to.path}` });
				})
				.catch((error) => {
					console.log(error);
					next({ path: "/login" });
				});
		}
		// const userinfo = await Admin.getInfo();
		// userStore.setInfo(userinfo.data);
		// userStore.permission.forEach((item) => {
		// 	router.addRoute("Layout", item);
		// });
		// next({ path: `${to.path}` });
		// if(){}
		//可能是用户点击刷新,尝试获取用户信息,失败和其余情况都是未登录处理
		// next({ path: "/login" });
	}
	// if (userStore.userinfo.id === 0 && to.path !== "/login") {
	// 	console.log("1");
	// 	next({ path: "/login" });
	// } else if (userStore.isRefresh && userStore.userinfo.id !== 0) {
	// 	console.log(userStore.permission);
	// 	resetRouter();
	// 	userStore.permission.forEach((item) => {
	// 		router.addRoute("Layout", item);
	// 	});
	// 	userStore.isRefresh = false;
	// 	next({ path: `${to.path}` });
	// } else {
	// 	console.log("3");
	// 	next();
	// }
	// next();
});

/** 参数依然有to, form, next，只是没遇到就不加了 **/
router.afterEach((to) => {
	// 跳转成功设置标题
	document.title = to.meta.title ? to.meta.title : "回收项目";
	// 返回顶部
	window.screenTop = 0;
});
