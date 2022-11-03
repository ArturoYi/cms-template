<script setup lang="ts">
import { computed } from "vue";
// import { useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";
// import { useUserStore } from "@/store/modules/user";
// 組件
import Breadcrumb from "../Breadcrumb/index.vue";
import Hamburger from "../Hamburger/index.vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import LangSwitch from "@/components/LangSwitch/index.vue";
import PersonalCenter from "@/components/PersonalCenter/index.vue";
// import Screenfull from "@/components/Screenfull/index.vue";

// 注冊
// const router = useRouter();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
// const userStore = useUserStore();
// 側邊欄狀態
const sidebar = computed(() => {
	return appStore.sidebar;
});
// 主題按鈕
const showThemeSwitch = computed(() => {
	return settingsStore.showThemeSwitch;
});
// 全屏
// const showScreenfull = computed(() => {
// 	return settingsStore.showScreenfull;
// });
// 側邊欄
const toggleSidebar = () => {
	appStore.toggleSidebar(false);
};
// 退出登錄
// const logout = () => {
// 	// userStore.logout();
// 	router.push("/login");
// };
</script>
<template>
	<div class="navigation-bar">
		<Hamburger :is-active="sidebar.opened" @toggle-click="toggleSidebar" class="hamburger" />
		<Breadcrumb class="breadcrumb" />
		<div class="right-menu">
			<ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
			<LangSwitch />
			<PersonalCenter />
		</div>
	</div>
</template>
<style scoped lang="scss">
.navigation-bar {
	overflow: hidden;
	height: var(--v3-navigationbar-height);
	background: #ffffff;

	.hamburger {
		display: flex;
		align-items: center;
		float: left;
		padding: 0 15px;
		height: 100%;
		cursor: pointer;
	}

	.breadcrumb {
		float: left;
	}

	.right-menu {
		display: flex;
		align-items: center;
		float: right;
		margin-right: 10px;
		height: 100%;
		color: #606266;

		.right-menu-item {
			padding: 0 10px;
			cursor: pointer;
		}
	}
}
</style>
