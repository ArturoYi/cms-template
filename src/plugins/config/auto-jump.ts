import { type App } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
const userStore = useUserStoreHook();
export default {
	install: (app: App) => {
		app.config.globalProperties.$cms_jump_time = setTimeout(() => {
			if (userStore.logined) {
				userStore.loginOut();
			}
		}, 5000);
		app.config.globalProperties.$cms_jump = () => {
			clearInterval(app.config.globalProperties.$cms_jump_time);
			app.config.globalProperties.$cms_jump_time = setTimeout(() => {
				if (userStore.logined) {
					userStore.loginOut();
				}
			}, 8 * 60 * 60 * 1000);
		};
	}
};
