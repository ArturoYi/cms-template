import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
import { hasPermissionTo } from "@/store/modules/permission";
import { whiteList } from "@/config/white-list";
router.beforeEach(async (to, form, next) => {
	// 只能在路由钩子内使用pinia
	const userStore = useUserStoreHook();
	// const permissronStore = usePermissionStore();
	/**
	 * 正常我們只需要做兩件事
	 * 是否已經登錄
	 * 是否有權限
	 * 其餘幾乎都跳登錄頁或警告沒有權限
	 */
	if (userStore.logined) {
		if (to.path === "/login") {
			// 已经登录要去登录页的重定向到首页
			next({ path: "/", replace: true });
		} else {
			if (to.path === "/") {
				next({ replace: true });
			} else {
				// 在这里判断权限
				if (userStore.userinfo.admin || hasPermissionTo(userStore.userinfo.permissions, to)) {
					next();
				} else {
					// 注意首页情况
					next({ path: "/login", replace: true });
				}
			}
			/**
			 * 到这里我们已经拼接用户的路由，不要在重复判断
			 * 但是安全起见可以再一次拼接路由，不会影响结果
			 */
		}
	} else {
		// 注意是异步一定要等待获取信息，不管是否成功
		// const res = await userStore.setInfo();
		// console.warn(res);
		if (userStore.logined) {
			if (to.path === "/login") {
				// 已经登录要去登录页的重定向到首页
				next({ path: "/", replace: true });
			} else {
				if (to.path === "/") {
					next({ replace: true });
				} else {
					// 在这里判断权限
					if (userStore.userinfo.admin || to.path === "/dashboard" || hasPermissionTo(userStore.userinfo.permissions, to)) {
						next();
					} else {
						next({ path: "/login", replace: true });
					}
				}
				/**
				 * 到这里我们已经拼接用户的路由，不要在重复判断
				 * 但是安全起见可以再一次拼接路由，不会影响结果
				 */
			}
		} else if (whiteList.indexOf(to.path) != -1) {
			next();
		} else {
			next({ path: "/login" });
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
