import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue");
/**基本路由 */
export const baseRouter: RouteRecordRaw[] = [
	{
		path: "/redirect",
		component: Layout,
		meta: {
			permissions: []
		},
		children: [
			{
				path: "/redirect/:path(.*)",
				component: () => import("@/views/redirect/index.vue")
			}
		]
	},
	{
		path: "/",
		component: Layout,
		redirect: "/dashboard",
		name: "Layout",
		children: [
			{
				path: "/dashboard",
				component: () => import("@/views/dashboard/index.vue"),
				name: "Dashboard",
				meta: {
					title: "首页",
					svgIcon: "dashboard",
					affix: true,
					hidden: true
					// permissions: []
				}
			}
		]
	},
	{
		path: "/login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			hidden: true,
			permissions: []
		}
	},
	{
		path: "/:pathMatch(.*)*",
		component: () => import("@/views/error/404.vue"),
		meta: {
			hidden: true,
			permissions: []
		}
	}
];

const router = createRouter({
	history:
		import.meta.env.VITE_ROUTER_HISTORY === "hash"
			? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
			: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
	routes: baseRouter
});

/** 重置路由 */
export function resetRouter() {
	// 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
	try {
		router.getRoutes().forEach((route) => {
			const { name, meta } = route;
			if (name && meta.roles?.length) {
				router.hasRoute(name) && router.removeRoute(name);
			}
		});
	} catch (error) {
		// 强制刷新浏览器也行，只是交互体验不是很好
		window.location.reload();
	}
}

export default router;
