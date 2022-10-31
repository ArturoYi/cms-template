import type { RouteRecordRaw } from "vue-router";
// import { usePermissionStoreHook } from "@/store/modules/permission";
import { useRolesStoreHook } from "@/store/modules/roles";
import { useUserStoreHook } from "@/store/modules/user";
// const permissionStore = usePermissionStoreHook();
const rolesStore = useRolesStoreHook();
const userStore = useUserStoreHook();

// 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
const dynamicRoutes: RouteRecordRaw[] = rolesStore.getRoutes(userStore.userinfo.admin, userStore.userinfo.permissions);
const homeRouter: RouteRecordRaw[] = dynamicRoutes;
export default homeRouter;
