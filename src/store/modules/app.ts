import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getSidebarStatus, setSidebarStatus } from "@/utils/cache/localStorage";
export enum DeviceType {
	Mobile,
	Desktop
}

interface ISidebar {
	opened: boolean;
	withoutAnimation: boolean;
}

export const useAppStore = defineStore("app", () => {
	const sidebar: ISidebar = reactive({
		opened: getSidebarStatus() !== "closed",
		withoutAnimation: false
	});
	// 默认为桌面类型
	const device = ref<DeviceType>(DeviceType.Desktop);
	// 改变导航栏
	const toggleSidebar = (withoutAnimation: boolean) => {
		sidebar.opened = !sidebar.opened;
		sidebar.withoutAnimation = withoutAnimation;
		if (sidebar.opened) {
			setSidebarStatus("opened");
		} else {
			setSidebarStatus("closed");
		}
	};
	// 关闭导航栏
	const closeSidebar = (withoutAnimation: boolean) => {
		sidebar.opened = false;
		sidebar.withoutAnimation = withoutAnimation;
		setSidebarStatus("closed");
	};
	const toggleDevice = (value: DeviceType) => {
		device.value = value;
	};
	return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice };
});
