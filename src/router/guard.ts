import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
const userStore = useUserStoreHook();
// import { usePermissionStoreHook } from "@/store/modules/permission";
// import { useRolesStoreHook, hasPermission } from "@/store/modules/roles";
import { whiteList } from "@/config/white-list";
router.beforeEach(async (to, form, next) => {
	// const permissionStore = usePermissionStoreHook();
	// const rolesStore = useRolesStoreHook();
	/**
	 * 正常我們只需要做兩件事
	 * 是否已經登錄
	 * 是否有權限
	 */
	if (userStore.logined) {
		if (to.path === "/login") {
			// 已经登录要去登录页的重定向到首页
			next({ path: "/", replace: true });
		} else {
			if (to.path === "/") {
				next({ replace: true });
			} else {
				next();
			}
			/**
			 * 到这里我们已经拼接用户的路由，不要在重复判断
			 * 但是安全起见可以再一次拼接路由，不会影响结果
			 */
		}
	} else {
		if (whiteList.indexOf(to.path) != -1) {
			next();
		} else {
			next({ path: "/login" });
		}
	}
});
