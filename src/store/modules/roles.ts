import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import allRouter from "@/router/config/index";

function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
	return key in object;
}
// 定义返回类型
interface RoleResult {
	roles: string[];
	permission: string[];
}
interface permissionsChild {
	module: string;
	permission: string;
}
type permissions = {
	module: string;
	permission: permissionsChild;
};
// 数据扁平化处理，把下面permissions组成一个string的数组
export const getPermissionRoleGroup = (permissions: permissions[]): RoleResult => {
	const roles: string[] = []; //角色权限
	const permission: string[] = []; //操作权限
	permissions.map((item) => {
		for (const group in item) {
			if (isValidKey(group, item)) {
				for (const role of Object.keys(item[group])) {
					const p = item[group][role] as permissionsChild;
					if (!roles.includes(p.permission)) {
						permission.push(p.permission);
					}
					if (!permission.includes(p.module)) {
						roles.push(p.module);
					}
				}
			}
		}
	});
	return { roles, permission };
};
// 判断有没有这个操作的权限，先调用上面的函数
export const hasPermission = (permissions: permissions[], route: RouteRecordRaw) => {
	const permission: string[] = getPermissionRoleGroup(permissions).permission;
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
// 判断有没有该角色路由权限
export const hasRole = (permissions: permissions[], route: RouteRecordRaw) => {
	const roles: string[] = getPermissionRoleGroup(permissions).roles;
	if (route.meta && route.meta.permissions && route.meta.permissions.length > 0) {
		return roles.some((role) => {
			if (route.meta?.permissions !== undefined) {
				return route.meta.permissions.includes(role);
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
		if (hasRole(permission, r)) {
			if (r.children) {
				r.children = filterAsyncRoutes(r.children, permission);
			}
			res.push(r);
		}
	});
	return res;
};

export const useRolesStore = defineStore("roles", () => {
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
	return { routes, dynamicRoutes, getRoutes };
});

/** 在 setup 外使用 */
export function useRolesStoreHook() {
	if (useRolesStore(store) !== null) {
		return useRolesStore(store);
	} else {
		return null;
	}
}
