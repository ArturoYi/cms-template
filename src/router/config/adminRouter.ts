import type { RouteRecordRaw } from "vue-router";

export const adminRouter: RouteRecordRaw[] = [
	{
		path: "/admin",
		component: () => import("@/views/admin/index.vue"),
		name: "indx-1",
		meta: {
			elIcon: "CirclePlus",
			title: "管理员",
			roles: ["admin"],
			permissions: ["管理员"]
		},
		children: [
			{
				path: "/admin/index",
				component: () => import("@/views/admin/index.vue"),
				name: "indx-2",
				meta: {
					elIcon: "CirclePlus",
					title: "管理员2",
					permissions: []
				}
			},
			{
				path: "/admin/index2",
				component: () => import("@/views/admin/index.vue"),
				name: "indx-3",
				meta: {
					elIcon: "CirclePlus",
					title: "管理员3",
					permissions: []
				}
			}
		]
	}
];
