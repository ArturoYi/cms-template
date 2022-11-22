import type { RouteRecordRaw } from "vue-router";
/** 可以在这里生成动态路由，这里是全局引入*/
import allRouter from "../config";
const homeRouter: RouteRecordRaw[] = allRouter;
export default homeRouter;
