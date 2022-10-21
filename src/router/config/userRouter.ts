import type { RouteRecordRaw } from "vue-router";

export const userRouter: RouteRecordRaw[] = [
	{
		path: "/user",
		component: () => import("@/views/user/index.vue"),
		meta: {
			roles: ["user"]
		},
		children: [
			{
				path: "/user/index",
				component: () => import("@/views/user/index.vue"),
				meta: {}
			}
		]
	}
];
