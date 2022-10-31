/*
 * @Description:
 * @User: Chen
 * @Date: 2022-10-24 17:26:54
 */
import { watch, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useAppStore, DeviceType } from "@/store/modules/app";

/** 参考 Bootstrap 的响应式设计 WIDTH = 992 */
const WIDTH = 992;

/** 根据大小变化重新布局 */
export default () => {
	const route = useRoute();
	const appStore = useAppStore();
	// 小于992响应式
	const _isMobile = () => {
		const rect = document.body.getBoundingClientRect();
		return rect.width - 1 < WIDTH;
	};
	// 关闭sidBar
	const _resizeHandler = () => {
		if (!document.hidden) {
			const isMobile = _isMobile();
			appStore.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
			if (isMobile) {
				appStore.closeSidebar(true);
			}
		}
	};
	// 监听路由和sidebar状态
	watch(
		() => route.name,
		() => {
			if (appStore.device === DeviceType.Mobile && appStore.sidebar.opened) {
				appStore.closeSidebar(false);
			}
		}
	);
	// 注册监听屏幕变化
	onBeforeMount(() => {
		window.addEventListener("resize", _resizeHandler);
	});
	// init根据屏幕宽度初始化设置
	onMounted(() => {
		if (_isMobile()) {
			appStore.toggleDevice(DeviceType.Mobile);
			appStore.closeSidebar(true);
		}
	});
	// 销毁监听事件
	onBeforeUnmount(() => {
		window.removeEventListener("resize", _resizeHandler);
	});
};
