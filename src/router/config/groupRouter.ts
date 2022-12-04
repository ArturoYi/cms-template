import type { RouteRecordRaw } from "vue-router";

export const groupRouter: RouteRecordRaw[] = [
	{
		path: "/group",
		// component: () => import("@/views/group/group-list.vue"),
		redirect: "/group/index",
		name: "indx-1",
		meta: {
			elIcon: "CirclePlus",
			title: "权限管理",
			roles: [],
			permissions: ["管理员"]
		},
		children: [
			{
				path: "/group/group-list",
				component: () => import("@/views/group/group-list.vue"),
				name: "grouplist",
				meta: {
					elIcon: "CirclePlus",
					title: "grouplist",
					permissions: []
				}
			},
			{
				path: "/group/:id/permissions",
				component: () => import("@/views/group/group-permissions.vue"),
				name: "group-permissions",
				meta: {
					hidden: true,
					activeMenu: "/group/group-list",
					elIcon: "CirclePlus",
					title: "group-permissions",
					permissions: []
				}
			},
			{
				path: "/group/add",
				component: () => import("@/views/group/group-add.vue"),
				name: "group-add",
				meta: {
					hidden: true,
					activeMenu: "/group/group-list",
					elIcon: "group-add",
					title: "权限管理3",
					permissions: []
				}
			}
		]
	}
];
