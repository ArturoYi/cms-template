import type { RouteRecordRaw } from "vue-router";
// import allRouter from "../config";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useUserStoreHook } from "@/store/modules/user";
const permissionStore = usePermissionStoreHook();
const userStore = useUserStoreHook();

// 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
// 這裡整合路由
permissionStore.getPermissions(userStore.userinfo.permissions);
permissionStore.getRoutes(["admin"]);
const homeRouter: RouteRecordRaw[] = permissionStore.routes;

export default homeRouter;
