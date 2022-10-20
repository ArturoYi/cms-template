// import { ref } from "vue";
// import store from "@/store";
// import { defineStore } from "pinia";
// import type { RouteRecordRaw } from "vue-router";
// import allRouter from "@/router/config/index";

// const hasPermission = (roles: string[], route: RouteRecordRaw) => {
// 	if (route.meta && route.meta.roles) {
// 		return roles.some((role) => {
// 			if (route.meta?.roles !== undefined) {
// 				return route.meta.roles.includes(role);
// 			} else {
// 				return false;
// 			}
// 		});
// 	} else {
// 		return true;
// 	}
// };

// const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
// 	// 記錄路由
// 	const res: RouteRecordRaw[] = [];
// 	routes.forEach((route) => {
// 		console.log(route);
// 		const r = { ...route };
// 		if (hasPermission(roles, r)) {
// 			if (r.children) {
// 				r.children = filterAsyncRoutes(r.children, roles);
// 			}
// 			res.push(r);
// 		}
// 	});
// 	return [];
// };

// export const usePermissionStore = defineStore("permission", () => {
// 	const routes = ref<RouteRecordRaw[]>([]);
// 	const dynamicRoutes = ref<RouteRecordRaw[]>([]);

// 	const getRoutes = (roles: string[]) => {
// 		let accessedRoutes;
// 		// eslint-disable-next-line prefer-const
// 		accessedRoutes = filterAsyncRoutes(allRouter, roles);
// 		routes.value = accessedRoutes;
// 		dynamicRoutes.value = accessedRoutes;
// 	};
// 	return { routes, dynamicRoutes, getRoutes };
// });

// /** 在 setup 外使用 */
// export function usePermissionStoreHook() {
// 	return usePermissionStore(store);
// }
export {};
