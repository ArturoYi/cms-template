import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
interface permissionsChild {
	module: string;
	permission: string;
}
interface permissions {
	module: string;
	permission: permissionsChild;
}
//TS获取key
function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
	return key in object;
}
// 解析所有有权限的分组模块
export const getPermissionModule = (permissions: permissions[]): string[] => {
	const module: string[] = [];
	if (permissions.length !== 0) {
		permissions.forEach((item) => {
			// console.log(Object.keys(item));
			module.push(Object.keys(item)[0]);
		});
	}
	return module;
};
// 解析所有有权限的操作
export const getPermissionGroup = (permissions: permissions[]): string[] => {
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
// 判断有没有这个模块页面的权限
export const hasGroup = (permissions: permissions[], route: RouteRecordRaw) => {
	const permission: string[] = getPermissionModule(permissions);
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
	const permission: string[] = getPermissionGroup(permissions);
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
export const filterAsyncRoutes = (routes: RouteRecordRaw[], permission: permissions[]): RouteRecordRaw[] => {
	const res: RouteRecordRaw[] = [];
	routes.forEach((route) => {
		const r = { ...route };
		if (hasGroup(permission, r)) {
			if (r.children) {
				r.children = filterAsyncRoutes(r.children, permission);
			}
			res.push(r);
		}
	});
	return res;
};
/**
 * 判断有没有这个操作的权限，先调用上面的函数
 * 其實和hasPermission一樣，這裡分開只是方便管理，畢竟類型有差別
 */
export const hasPermissionTo = (permissions: permissions[], route: RouteLocationNormalized) => {
	const permission: string[] = getPermissionGroup(permissions);
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
