<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/modules/app";
// import { usePermissionStore } from "@/store/modules/permission";
import { useRolesStore } from "@/store/modules/roles";
import SidebarItemVue from "./SidebarItem.vue";
import { useSettingsStore } from "@/store/modules/settings";
import SidebarLogo from "@/layout/components/SideBar/SidebarLogo.vue";
// import { getCssVariableValue } from "@/utils/validate";
// const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color");
// const v3SidebarMenuTextColor = getCssVariableValue("--v3-sidebar-menu-text-color");
// const v3SidebarMenuActiveTextColor = getCssVariableValue("--v3-sidebar-menu-active-text-color");
// 逻辑
const route = useRoute();
const appStore = useAppStore();
// const permissionStore = usePermissionStore();
const rolesStore = useRolesStore();
const settingsStore = useSettingsStore();
const { showSidebarLogo } = storeToRefs(settingsStore);
// // 记录当前点击路由
const activeMenu = computed(() => {
	const { meta, path } = route;
	if (meta?.activeMenu) {
		return meta.activeMenu;
	}
	return path;
});

// onMounted(() => {
// 	:background-color="v3SidebarMenuBgColor"
// :text-color="v3SidebarMenuTextColor"
// 				:active-text-color="v3SidebarMenuActiveTextColor"
// });

// 是否收起菜单
const isCollapse = computed(() => {
	return !appStore.sidebar.opened;
});
</script>
<template>
	<div :class="{ 'has-logo': showSidebarLogo }">
		<SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false" mode="vertical">
				<SidebarItemVue v-for="route in rolesStore.setRoutes()" :key="route.path" :item="route" :base-path="route.path" :is-collapse="isCollapse" />
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
@mixin tip-line {
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 2px;
		height: 100%;
		background-color: var(--v3-sidebar-menu-tip-line-bg-color);
	}
}

.has-logo {
	.el-scrollbar {
		height: calc(100% - var(--v3-header-height));
	}
}

.el-scrollbar {
	height: 100%;

	:deep(.scrollbar-wrapper) {
		// 限制水平宽度
		overflow-x: hidden !important;

		.el-scrollbar__view {
			height: 100%;
		}
	}

	// 滚动条
	:deep(.el-scrollbar__bar) {
		&.is-horizontal {
			// 隐藏水平滚动条
			display: none;
		}
	}
}

.el-menu {
	border: none;
	width: 100% !important;
	height: 100%;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
	display: block;
	height: var(--v3-sidebar-menu-item-height);
	line-height: var(--v3-sidebar-menu-item-height);

	&.is-active,
	&:hover {
		background-color: var(--v3-sidebar-menu-hover-bg-color);
	}

	* {
		vertical-align: middle;
	}
}

:deep(.el-menu-item) {
	&.is-active {
		@include tip-line;
	}
}

.el-menu--collapse {
	:deep(.el-sub-menu) {
		&.is-active {
			.el-sub-menu__title {
				color: var(--v3-sidebar-menu-active-text-color) !important;
				@include tip-line;
			}
		}
	}
}
</style>
