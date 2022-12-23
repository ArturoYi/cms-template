import type { RouteRecordRaw } from "vue-router";
import { adminRouter } from "./adminRouter";
import { userRouter } from "./userRouter";
import { groupRouter } from "./groupRouter";

// 這裡是還沒經過篩選的全部路由
const allRouter: RouteRecordRaw[] = [
	...adminRouter,
	...userRouter,
	...groupRouter
	// {
	// 	path: "dashboard",
	// 	component: () => import("@/views/dashboard/index.vue"),
	// 	name: "Dashboard",
	// 	meta: {
	// 		title: "首页",
	// 		svgIcon: "dashboard",
	// 		affix: true
	// 		// hidden: true
	// 	}
	// }
];

export default allRouter;
