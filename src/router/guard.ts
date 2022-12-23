import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
import { resetRouter } from "./index";
router.beforeEach(async (to, form, next) => {
	// 只能在路由钩子内使用pinia
	const userStore = useUserStoreHook();
	if (userStore.userinfo.id === 0 && to.path !== "/login") {
		next({ path: "/login" });
	} else if (userStore.isRefresh) {
		resetRouter();
		userStore.permission.forEach((item) => {
			router.addRoute("Layout", item);
		});
		userStore.isRefresh = false;
		next({ path: `${to.path}` });
	} else {
		next();
	}
});

/** 参数依然有to, form, next，只是没遇到就不加了 **/
router.afterEach((to) => {
	// 跳转成功设置标题
	document.title = to.meta.title ? to.meta.title : "回收项目";
	// 返回顶部
	window.screenTop = 0;
});
