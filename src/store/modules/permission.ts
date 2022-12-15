import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import allRouter from "@/router/config/index";
function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
	return key in object;
}

interface permissionsChild {
	module: string;
	permission: string;
}
type permissions = {
	module: string;
	permission: permissionsChild;
};

export const getPermissionRoleGroup = (permissions: permissions[]): string[] => {
	const permission: string[] = []; //permission权限
	if (permissions.length !== 0) {
		permissions.map((item) => {
			for (const group in item) {
				if (isValidKey(group, item)) {
					for (const role of Object.keys(item[group])) {
						const p = item[group][role] as permissionsChild;
						if (!permission.includes(p.permission)) {
							permission.push(p.permission);
						}
					}
				}
			}
		});
	}
	return permission;
};

/**
 * 判断有没有这个操作的权限，先调用上面的函数
 * 其實和hasPermission一樣，這裡分開只是方便管理，畢竟類型有差別
 */
export const hasPermissionTo = (permissions: permissions[], route: RouteLocationNormalized) => {
	const permission: string[] = getPermissionRoleGroup(permissions);
	if (route.meta && route.meta.permissions && route.meta.permissions.length > 0) {
		return permission.some((permission) => {
			if (route.meta?.permissions !== undefined) {
				return route.meta.permissions.includes(permission);
			} else {
				return false;
			}
		});
	} else {
		return true;
	}
};

// 判断有没有这个操作的权限，先调用上面的函数
export const hasPermission = (permissions: permissions[], route: RouteRecordRaw) => {
	const permission: string[] = getPermissionRoleGroup(permissions);
	if (route.meta && route.meta.permissions && route.meta.permissions.length > 0) {
		return permission.some((permission) => {
			if (route.meta?.permissions !== undefined) {
				return route.meta.permissions.includes(permission);
			} else {
				return false;
			}
		});
	} else {
		return true;
	}
};
// 筛选路由
export const filterAsyncRoutes = (routes: RouteRecordRaw[], permission: permissions[]) => {
	const res: RouteRecordRaw[] = [];
	routes.forEach((route) => {
		const r = { ...route };
		if (hasPermission(permission, r)) {
			if (r.children) {
				r.children = filterAsyncRoutes(r.children, permission);
			}
			res.push(r);
		}
	});
	return res;
};

// pinia模塊在這裡
export const usePermissionStore = defineStore("Permission", () => {
	const routes = ref<RouteRecordRaw[]>([]);
	const dynamicRoutes = ref<RouteRecordRaw[]>([]);
	const getRoutes = (admin: boolean, permission: permissions[]) => {
		let accessedRoutes;
		if (admin) {
			accessedRoutes = allRouter;
		} else {
			accessedRoutes = filterAsyncRoutes(allRouter, permission);
		}
		routes.value = accessedRoutes;
		dynamicRoutes.value = accessedRoutes;
		return accessedRoutes;
	};
	const setRoutes = () => {
		if (!useUserStore().logined) {
			useUserStore().setInfo();
		}
		let accessedRoutes;
		if (useUserStore().userinfo.admin) {
			accessedRoutes = allRouter;
		} else {
			accessedRoutes = filterAsyncRoutes(allRouter, useUserStore().userinfo.permissions);
		}
		routes.value = accessedRoutes;
		dynamicRoutes.value = accessedRoutes;
		return accessedRoutes;
	};
	return { routes, dynamicRoutes, getRoutes, setRoutes };
});

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
	// if (usePermissionStore(store) !== null) {
	return usePermissionStore(store);
	// } else {
	// 	return null;
	// }
}
