import type { RouteRecordRaw } from "vue-router";
import { adminRouter } from "./adminRouter";
import { userRouter } from "./userRouter";

// 這裡是還沒經過篩選的全部路由
const allRouter: RouteRecordRaw[] = [...adminRouter, ...userRouter];

export default allRouter;
